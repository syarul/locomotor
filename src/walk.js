import { vtreeRender } from './renderer'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { on, onStateChanged } from 'hookuspocus/src/on'
import { useEffect } from 'hookuspocus/src/use_effect'

// memo store, this basically to imitate React.memo
// without using useCallback all over the place to
// handle efficient rendering, rather that we store
// the current state of of rendering and flag the
// context which is dirty on subsequent lifeCycle

const lifeCycles = new (WeakMap || Map)()
lifeCycles.stack = new (WeakMap || Map)()
lifeCycles.base = []
lifeCycles.fn = new (WeakMap || Map)()

const cleanup = ({ e = [] }) => Array.from(e, run => run())

onStateChanged(context => {
  const [rootBaseContext] = lifeCycles.base
  const [rootContext] = lifeCycles.get(rootBaseContext)
  const ctx = lifeCycles.fn.get(context)
  // run side effects
  cleanup(ctx)
  // flag context dirty
  lifeCycles.fn.set(context, {
    ...ctx,
    s: false
  })
  // get root props
  const { p } = lifeCycles.fn.get(rootContext)
  // generate an efficient new vtree
  const vtree = pocus([p], rootContext)
  // emit changes to render so patching can be done
  vtreeRender(vtree)
})

// effect interceptor
const onEffect = cb =>
  on(useEffect, (data, differEffect) => {
    const [context] = dataMap.get(data.context)
    differEffect().then(effect => {
      if (effect && typeof effect === 'function') {
        cb(effect, context)
      }
    })
  })

onEffect((effect, context) => {
  const ctx = lifeCycles.fn.get(context) || {}
  const { e } = ctx || []
  lifeCycles.fn.set(context, {
    ...ctx,
    e: e.concat(effect)
  })
})

// reset stacks once render done
const lifeCyclesRunReset = () => {
  Array.from(lifeCycles.base, context =>
    lifeCycles.stack.set(context, 0)
  )
}

// generate reusable functions hooks, key is not
// needed since array contexts should be handled
// properly through this approach
function getContex (context) {
  const stack = lifeCycles.stack.get(context) || 0
  const eStack = lifeCycles.get(context) || []
  const cStack = eStack[stack] || context.bind({})
  eStack[stack] = cStack
  lifeCycles.set(context, eStack)
  lifeCycles.stack.set(context, stack + 1)
  !~lifeCycles.base.indexOf(context) && lifeCycles.base.push(context)
  return cStack
}

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
function createContext ({ elementName, attributes }) {
  // If keyed attributes exist unbind the elementName and map it to the key.
  // This should address function hooks thats go through Array mapping or
  // use elsewhere** (not tested yet for reusable hooks)

  const context = getContex(elementName)

  let node = null

  const { s, n, p } = lifeCycles.fn.get(context) || {}

  // return memoize node if status is pristine and props unchanged
  if (s && isEqual(p, attributes)) {
    node = n
  } else {
    node = pocus([attributes], context)
  }

  // map the status/attributes where we will be able to retrive on subsequent runs
  lifeCycles.fn.set(context, {
    s: true,
    n: node,
    p: attributes
  })

  return node
}

// simple compare for objects
const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

function walk (node) {
  const { elementName, children } = node
  if (typeof elementName === 'function') {
    return createContext(node)
  }
  if (children && children.length) {
    return {
      ...node,
      children: Array.from(children, walk)
    }
  }
  return node
}

export {
  walk as default,
  lifeCyclesRunReset
}
