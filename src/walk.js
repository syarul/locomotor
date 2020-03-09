// import { vtreeRender } from './renderer'
import { providerMap, setNode } from './provider'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { comitQueue } from './queue'
import { isEqual, loop } from './utils'

// lifeCycles store
export const lifeCycles = new (WeakMap || Map)()
lifeCycles.gen = new (WeakMap || Map)()
lifeCycles.stack = new (WeakMap || Map)()
lifeCycles.base = []
lifeCycles.v = []
lifeCycles.fn = new (WeakMap || Map)()
lifeCycles.c = []
lifeCycles.w = []

// simple compare for objects
// const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

const consume = c => c()

const updateVtree = (node, context, newNode, rootContext) => {
  const update = n => updateVtree(n, context, newNode, rootContext)
  if (node instanceof Promise) {
    node.then(update)
  }
  if (node.context === context) {
    for (const attr in node) {
      node[attr] = newNode[attr]
    }
    node.context = context
  } else {
    if (node.context && node.context !== rootContext) {
      lifeCycles.c.push(node.context)
    }
    if (Array.isArray(node)) {
      loop(node, update)
    } else if (node.children && node.children.length) {
      loop(node.children, update)
    }
  }
  return node
}

// const render = (...args) =>
//   vtreeRender(updateVtree.apply(null, args))

export const hydrate = (context, vtree, callback) => {
  const [rootBaseContext] = lifeCycles.base
  const rootContext = lifeCycles.get(rootBaseContext)[0]
  lifeCycles.c.push(rootContext)
  const ctx = lifeCycles.fn.get(context)
  let node
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
  if (context !== rootContext) {
    lifeCycles.c.push(context)
    vtree = lifeCycles.fn.get(rootContext)
    if (vtree.n instanceof Promise) {
      promises.push(vtree.n)
      resolver.push(n => {
        vtree.n = n
      })
    }
  }

  const merge = () => {
    setNode(node, context)
    if (context !== rootContext) {
      const n = updateVtree(vtree.n, context, node, rootContext)
      vtree.n = n
      callback(vtree)
    } else {
      callback({
        ...ctx,
        n: node
      })
    }
  }

  if (promises.length) {
    Promise.all(promises).then(r =>
      r.map((r, i) => resolver[i](r))
    ).then(merge)
  } else {
    merge()
  }
}

// const extractContexts = (vtree, actives = []) => {
//   const { context, children } = vtree || {}
//   if (context !== undefined) {
//     actives.push(context)
//   }
//   const extractList = vtree => extractContexts(vtree, actives)
//   if (Array.isArray(vtree)) {
//     vtree.loop(extractList)
//   }
//   if (children && children.length) {
//     children.loop(extractList)
//   }
//   return actives
// }

export const flattenContext = () => {
  lifeCycles.w.push(lifeCycles.c)
  if(lifeCycles.w.length > 2) {
    lifeCycles.w.shift()
  }
  lifeCycles.c = []
}

// reset stacks once render done also do house
// cleaning of unused context generations in
// in lifecycle stores
export const lifeCyclesRunReset = lifecycle => {
  // console.log(lifeCycles.w)
  // retrieved active contexts
  const activeContexts = lifeCycles.w[1] //extractContexts(vtree)
  // lifeCycles.v.push(activeContexts)
  // lifeCycles.v.length > 2 && lifeCycles.v.shift()
  // filter out unused contexs
  if (lifeCycles.w.length === 2) {
    const oldContexts = lifeCycles.w[0]
    const removals = oldContexts.filter(ctx => !~activeContexts.indexOf(ctx))
    removals.forEach(ctx => {
      // cleanup dataMap
      dataMap.delete(ctx)
      const index = lifeCycles.gen.get(ctx)
      const fn = lifeCycles.base[index]
      if (fn) {
        const eStack = lifeCycles.get(fn) || {}
        for (const i in eStack) {
          (eStack[i] === ctx) && delete eStack[i]
        }
        lifeCycles.set(fn, eStack)
        lifeCycles.gen.delete(ctx)
        lifeCycles.fn.delete(ctx)
      }
    })
  }

  loop(lifeCycles.base, context => {
    const stack = lifeCycles.stack.get(context)
    if (stack !== undefined) {
      lifeCycles.stack.set(context, 0)
    }
  })
  lifeCycles.stage = lifecycle
  // reset provider stack
  providerMap.s = 0
  // consume providers
  loop(providerMap.c, consume)
  // reset providers consumers
  providerMap.c = []
}

/**
 * hooks generation through isolating each
 * context reference, ideally we still need
 * to retrieve it again on each cycle generation,
 * due to certain context may get removed we also
 * need to do cleanup upon each cycles
 * @param {elementName} fn The context reference
 * @param {attributes} attributes The context props
 */
const getContex = (fn, attributes) => {
  // get current key if it has one
  const { key } = attributes
  // each generation on context is assigned a stack key
  const stack =
    // retrieve last assigned stack key
    lifeCycles.stack.get(fn) ||
    // if current context attributes has key prop
    // we used that instead
    (key !== undefined && key) ||
    // assign default index `0` on 1st generation
    0
  // get all generations of this context
  const eStack =
    // previous generations
    lifeCycles.get(fn) ||
    // create a new generation store if none exist
    {}
  // retrieve the actual context
  const cStack =
    // last generation context
    eStack[stack] ||
    // isolate the reference with binding
    // on new generation
    fn.bind({})
  // assign the generation in the store if it
  // a first time generation
  !eStack[stack] && (eStack[stack] = cStack)
  // store the generations by reference
  lifeCycles.set(fn, eStack)
  // if a key was unavailable we increase the stack
  // count so a subsequent call using the reference
  // will not get duplicated
  key === undefined && lifeCycles.stack.set(fn, stack + 1)
  const index = lifeCycles.base.indexOf(fn)
  if (!~index) {
    // store all reference in a bookkeeping array
    lifeCycles.base.push(fn)
    // reference of the original generations index
    lifeCycles.gen.set(cStack, lifeCycles.base.length - 1)
  } else {
    // if reference already bookkept we used that instead
    lifeCycles.gen.set(cStack, index)
  }
  return cStack
}

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
const createElement = ({ elementName, attributes }) => {
  const context = getContex(elementName, attributes)
  lifeCycles.c.push(context)
  let node = null
  const { n, p } = lifeCycles.fn.get(context) || {}
  // return memoize node if status is pristine and props unchanged
  if (isEqual(p, attributes)) {
    node = n
  } else {
    node = pocus([attributes], context)
  }
  const setNodeWithContext = node => setNode(node, context)
  node instanceof Promise ? node.then(setNodeWithContext) : setNodeWithContext(node)
  // store the attributes and the output element
  lifeCycles.fn.set(context, {
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
        children: loop(children, walk)
      }
    }
    return node
  }
}
