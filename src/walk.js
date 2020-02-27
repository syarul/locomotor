import { vtreeRender } from './renderer'
import { hookus, pocus, dataMap } from 'hookuspocus/src/core'
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

// simple compare for objects
const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

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
function getContex (fn) {
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

  // provider updates
  if (typeof node.elementName === 'object' && node.elementName.elementName === 'Locomotor.Provider') {
    const value = providerMap.get(node.elementName.context) || {}
    const currentValue = node.attributes.value || {}
    const update = {
      ...value,
      ...currentValue
    }
    providerMap.set(node.elementName.context, update)
  }

  // map the status/attributes where we will be able to retrive on subsequent runs
  lifeCycles.fn.set(context, {
    s: true,
    n: node,
    p: attributes
  })

  return node
}

const providerMap = new (WeakMap || Map)()

function locomotorCreateContext(value = {}) {
  const context = {
    Provider: 'Locomotor.Provider'
  }
  providerMap.set(context, value)
  return {
    Provider: {
      elementName: 'Locomotor.Provider',
      context
    }
  }
}

const useContext = hookus((data, { Provider }) => {
  console.log(providerMap, Provider, providerMap.get(context))
  const { context } = Provider
  data.s = data.s !== undefined ? data.s : (providerMap.get(context) || {})
  console.log(context)
  return data.s
})

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
  lifeCyclesRunReset,
  locomotorCreateContext as createContext,
  useContext,
  providerMap
}
