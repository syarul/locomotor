import { vtreeRender } from './renderer'
import { hookus, pocus, dataMap } from 'hookuspocus/src/core'
import { on, onStateChanged } from 'hookuspocus/src/on'
import { useEffect } from 'hookuspocus/src/use_effect'
import { useReducer } from 'hookuspocus/src/use_reducer'

// memo store, this basically to imitate React.memo
// without using useCallback all over the place to
// handle efficient rendering, rather that we store
// the current state of of rendering and flag the
// context which is dirty on subsequent lifeCycle

const lifeCycles = new (WeakMap || Map)()
lifeCycles.stack = new (WeakMap || Map)()
lifeCycles.base = []
lifeCycles.fn = new (WeakMap || Map)()
lifeCycles.parent = new (WeakMap || Map)()

// simple compare for objects
// const isEqual = (o, s) => JSON.stringify(o) === JSON.stringify(s)

const cleanup = ({ e = [] }) => Array.from(e, run => run())

// flag context dirty
const flag = (context, ctx) => {
  lifeCycles.fn.set(context, {
    ...ctx,
    s: false
  })
  const parentContext = parentMap.get(context)
  const pCtx = lifeCycles.fn.get(parentContext)
  if (parentContext && pCtx) {
    flag(parentContext && pCtx)
  }
}

onStateChanged(context => {
  const [rootBaseContext] = lifeCycles.base
  const [rootContext] = lifeCycles.get(rootBaseContext)
  const ctx = lifeCycles.fn.get(context)
  // run side effects
  cleanup(ctx)
  flag(context, ctx)

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

const lifeCyclesRunReset = () => {
  // reset stacks once render done
  Array.from(lifeCycles.base, context =>
    lifeCycles.stack.set(context, 0)
  )
  // reset provider stack
  providerMap.s = 0
  // consume providers
  Array.from(providerMap.u, run => run())
  // reset providers consumers
  providerMap.u = []
}

// generate reusable functions hooks, key is not
// needed since each function hooks is isolated
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

function updateProvider (stack, attributes) {
  const value = providerMap.get(providerMap.h[stack]) || {}
  let v = { ...value }
  for (const attr in attributes) {
    if (typeof attributes[attr] === 'object') {
      v = { ...v, ...attributes[attr] }
    } else {
      v[attr] = attributes[attr]
    }
  }
  const provider = providerMap.d.get(providerMap.h[stack])
  // register provider, consume at the next cycle
  providerMap.u.push(provider.bind(null, v))
}

const providerMap = new (WeakMap || Map)()
providerMap.h = []
providerMap.u = []
providerMap.d = new (WeakMap || Map)()

function createContext (value = {}) {
  const stack = providerMap.s || 0
  // increase stack once provider is consumed
  providerMap.s = stack + 1
  const context = {
    Provider: `Locomotor.Provider.${stack}`
  }
  providerMap.set(context, value)
  providerMap.h.push(context)
  return context
}

const useContext = hookus((data, context) => {
  data.s = data.s !== undefined ? data.s : (providerMap.get(context) || {})
  const cb = (_, action) => {
    data.s = action
    return data.s
  }
  const [state, dispatch] = useReducer(cb, data.s)
  providerMap.d.set(context, action => dispatch(action))
  return state
})

const parentMap = new (WeakMap || Map)()
const cycleNodes = []

function connectVtree (context) {
  cycleNodes.push(context)
  if (cycleNodes.length === 2) {
    parentMap.set(context, cycleNodes[0])
    cycleNodes.shift()
  }
}
// HORRAY!! pass the context through pocus
// so our function can use all hooks features
function createElement ({ elementName, attributes }) {
  // If keyed attributes exist unbind the elementName and map it to the key.
  // This should address function hooks thats go through Array mapping or
  // use elsewhere** (not tested yet for reusable hooks)

  const context = getContex(elementName)

  connectVtree(context)

  let node = null

  // const { s, n, p } = lifeCycles.fn.get(context) || {}

  // return memoize node if status is pristine and props unchanged
  // need to flag if parent node is pristine - tba
  // if (s && isEqual(p, attributes)) {
  // node = n
  // } else {
  node = pocus([attributes], context)
  // }

  if (node.elementName.match(/Locomotor.Provider./)) {
    const [stack] = node.elementName.match(/([^Locomotor.Provider.])(.*)/g)
    updateProvider(stack, node.attributes)
  }

  // map the status/attributes where we will be able to retrive on subsequent runs
  lifeCycles.fn.set(context, {
    s: true,
    n: node,
    p: attributes
  })

  return node
}

function walk (node) {
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

export {
  walk as default,
  lifeCyclesRunReset,
  createContext,
  useContext,
  providerMap
}
