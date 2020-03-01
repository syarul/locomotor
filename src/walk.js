import { vtreeRender } from './renderer'
import { providerMap, setNode } from './provider'
import { pocus } from 'hookuspocus/src/core'
import { onStateChanged } from 'hookuspocus/src/on'

// lifeCycles store
const lifeCycles = new (WeakMap || Map)()
lifeCycles.stack = new (WeakMap || Map)()
lifeCycles.base = []
lifeCycles.fn = new (WeakMap || Map)()

// simple compare for objects
const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

const consume = c => c()

const updateVtree = (node, context, newNode) => {
  if (node instanceof Promise) {
    node.then(n => updateVtree(n, context, newNode))
  }
  if (node.context === context) {
    for (const attr in node) {
      node[attr] = newNode[attr]
    }
    node.context = context
  } else {
    if (Array.isArray(node)) {
      Array.from(node, n => updateVtree(n, context, newNode))
    } else if (node.children && node.children.length) {
      Array.from(node.children, c => updateVtree(c, context, newNode))
    }
  }
  return node
}

const render = (...args) =>
  vtreeRender(updateVtree.apply(null, args))

onStateChanged(context => {
  const [rootBaseContext] = lifeCycles.base
  const [rootContext] = lifeCycles.get(rootBaseContext)
  const ctx = lifeCycles.fn.get(context)

  // flag context dirty, might be useful on some casses
  lifeCycles.fn.set(context, {
    ...ctx,
    s: false
  })

  const v = []

  let node = pocus([ctx.p], context)

  if (node instanceof Promise) {
    v.push(node)
    node.then(n => {
      node = n
    })
  }

  const vtree = lifeCycles.fn.get(rootContext)

  if (vtree.n instanceof Promise) {
    v.push(vtree.n)
    vtree.n.then(n => {
      vtree.n = n
    })
  }

  if (v.length) {
    Promise.all(v).then(() => {
      setNode(node, context)
      render(vtree.n, context, node)
    })
  } else {
    setNode(node, context)
    render(vtree.n, context, node)
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
  Array.from(lifeCycles.base, context =>
    lifeCycles.stack.set(context, 0)
  )
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
const getContex = fn => {
  const stack = lifeCycles.stack.get(fn) || 0
  const eStack = lifeCycles.get(fn) || []
  const cStack = eStack[stack] || fn.bind({})
  eStack[stack] = cStack
  lifeCycles.set(fn, eStack)
  lifeCycles.stack.set(fn, stack + 1)
  !~lifeCycles.base.indexOf(fn) && lifeCycles.base.push(fn)
  return cStack
}

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
const createElement = ({ elementName, attributes }) => {

  const context = getContex(elementName)

  let node = null

  const { s, n, p } = lifeCycles.fn.get(context) || {}

  // return memoize node if status is pristine and props unchanged
  if (s && isEqual(p, attributes)) {
    node = n
  } else {
    node = pocus([attributes], context)
  }

  node instanceof Promise
    ? node.then(n => setNode(n, context))
    : setNode(node, context)

  // map the status/attributes where we will be able to retrive on subsequent runs
  lifeCycles.fn.set(context, {
    s: true,
    n: node,
    p: attributes
  })

  return node
}

export const walk = node => {
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
