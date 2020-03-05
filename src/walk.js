import { vtreeRender } from './renderer'
import { providerMap, setNode } from './provider'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { on } from 'hookuspocus/src/on'
import { useReducer } from 'hookuspocus/src/use_reducer'

// lifeCycles store
export const lifeCycles = new (WeakMap || Map)()
lifeCycles.prev = new (WeakMap || Map)()
lifeCycles.stack = new (WeakMap || Map)()
lifeCycles.base = []
lifeCycles.fn = new (WeakMap || Map)()

// simple compare for objects
const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

const consume = c => c()

const updateVtree = (node, context, newNode) => {
  const update = n => updateVtree(n, context, newNode)
  if (node instanceof Promise) {
    node.then(update)
  }
  if (node.context === context) {
    for (const attr in node) {
      node[attr] = newNode[attr]
    }
    node.context = context
  } else {
    if (Array.isArray(node)) {
      Array.from(node, update)
    } else if (node.children && node.children.length) {
      Array.from(node.children, update)
    }
  }
  return node
}

const render = (...args) =>
  vtreeRender(updateVtree.apply(null, args))

const onStateChanged = cb =>
  on(useReducer, (data, reducer, initialArg, init) => {
    const [state, dispatch] = data.hook(data, reducer, initialArg, init)

    console.log(state)

    return [
      state,
      action => {
        const result = dispatch(action)
        if (state !== result) {
          cb(data.context)
        }
        return result
      }
    ]
  })

onStateChanged(context => {
  const [rootBaseContext] = lifeCycles.base
  const rootContext = lifeCycles.get(rootBaseContext)[0]

  const ctx = lifeCycles.fn.get(context)
  let node

  // flag context dirty, might be useful on some casses
  lifeCycles.fn.set(context, {
    ...ctx,
    s: false
  })

  node = pocus([ctx.p], context)

  lifeCycles.fn.set(context, {
    ...ctx,
    n: node
  })

  const [promises, resolver] = [[], []]

  if (node instanceof Promise) {
    promises.push(node)
    resolver.push(n => {
      node = n
    })
  }

  // if target is rootContext skip all things
  if (context === rootContext) {
    return vtreeRender(node)
  }

  const vtree = lifeCycles.fn.get(rootContext)

  if (vtree.n instanceof Promise) {
    promises.push(vtree.n)
    resolver.push(n => {
      vtree.n = n
    })
  }

  const merge = () => {
    setNode(node, context, ctx.p)
    render(vtree.n, context, node)
  }

  if (promises.length) {
    Promise.all(promises).then(r =>
      r.map((r, i) => resolver[i](r))
    ).then(merge)
  } else {
    merge()
  }
  // emit changes to render so patching can be done
  // vtree.n instanceof Promise
  //   ? vtree.n.then(n => render(n, context, node))
  //   : render(vtree.n, context, node)

  // // get root props
  // const { p } = lifeCycles.fn.get(rootContext)
  // // generate an efficient new vtree
  // const vtree = pocus([p], rootContext)
  // // emit changes to render so patching can be done
  // vtreeRender(vtree)
})

export const lifeCyclesRunReset = lifecycle => {
  // reset stacks once render done
  Array.from(lifeCycles.base, context => {
    console.log(dataMap.get(context))
    const stack = lifeCycles.stack.get(context)
    if (stack !== undefined) {
      lifeCycles.stack.set(context, 0)
    } else {
      const eStack = lifeCycles.get(context)
      console.log(eStack)
      // const prevStack = lifeCycles.prev.get(contex) || {}
      // if (currentStack) {
      //   Object.keys(currentStack).map(key => {

      //   })
      // }
    }
  })
  lifeCycles.stage = lifecycle
  // reset provider stack
  providerMap.s = 0
  // consume providers
  Array.from(providerMap.c, consume)
  // reset providers consumers
  providerMap.c = []
}

// generate reusable functions hooks, key is not
// needed since each function hooks is isolated
const _getContex = fn => {
  const stack = lifeCycles.stack.get(fn) || 0
  const eStack = lifeCycles.get(fn) || []
  const cStack = eStack[stack] || fn.bind({})
  // console.log(eStack[stack])
  eStack[stack] = cStack
  lifeCycles.set(fn, eStack)
  lifeCycles.stack.set(fn, stack + 1)
  !~lifeCycles.base.indexOf(fn) && lifeCycles.base.push(fn)
  return cStack
}

const getContex = (fn, attributes) => {
  const { key } = attributes
  
  const stack = lifeCycles.stack.get(fn) || (key !== undefined && key)  || 0
  const eStack = lifeCycles.get(fn) || {}
  const cStack = eStack[stack] || fn.bind({})
  // console.log(eStack)
  eStack[stack] = cStack
  lifeCycles.set(fn, eStack)
  if(key === undefined) {
    lifeCycles.stack.set(fn, stack + 1)
  }
  !~lifeCycles.base.indexOf(fn) && lifeCycles.base.push(fn)
  return cStack
}

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
const createElement = ({ elementName, attributes }) => {
  const context = getContex(elementName, attributes)
  // console.log(context)
  let node = null
  // const { s, n, p } = lifeCycles.fn.get(context) || {}
  // return memoize node if status is pristine and props unchanged
  // if (s && isEqual(p, attributes)) {
    // node = n
  // } else {
    node = pocus([attributes], context)
  // }
  // console.log(node)
  const setNodeWithContext = node => setNode(node, context, attributes)
  node instanceof Promise ? node.then(setNodeWithContext) : setNodeWithContext(node)
  // map the status/attributes where we will be able to retrive on subsequent runs
  lifeCycles.fn.set(context, {
    // s: true,
    n: node,
    p: attributes
  })
  return node
}

export const walk = node => {
  if (node instanceof Promise) {
    return node.then(walk)
  } else {
    const { elementName, children } = node
    if (typeof elementName === 'function') {
      return createElement(node)
    }
    if (children && children.length) {
      return {
        ...node,
        children: Array.from(children, walk)
      }
    }
    return node
  }
}
