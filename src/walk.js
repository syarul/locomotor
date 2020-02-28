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

const cleanup = ({ e = [] }) => Array.from(e, run => run())

const updateVtree = (node, context, newNode) => {
  if (node.context === context) {
    for (const attr in node) {
      node[attr] = newNode[attr]
    }
    node.context = context
  } else {
    if (node.children && node.children.length) {
      Array.from(node.children, child => updateVtree(child, context, newNode))
    }
  }
  return node
}

onStateChanged(context => {
  const [rootBaseContext] = lifeCycles.base
  const [rootContext] = lifeCycles.get(rootBaseContext)
  const { attributes, e } = lifeCycles.fn.get(context)
  // console.log(lifeCycles.fn.get(context))
  // cleanup side effects
  cleanup({ e })

  // new node of current context
  const node = pocus([attributes], context)

  const vtree = lifeCycles.fn.get(rootContext)
  const newVtree = updateVtree(vtree.node, context, node)
  // emit changes to render so patching can be done
  vtreeRender(newVtree)
})

// effect interceptor
const onEffect = cb =>
  on(useEffect, (data, differEffect) => {
    const [context] = dataMap.get(data.context)
    console.log('aw')
    differEffect().then(effect => {
      if (effect && typeof effect === 'function') {
        cb(effect, context)
      }
    })
  })

onEffect((effect, context) => {
  const ctx = lifeCycles.fn.get(context) || {}
  const { e } = ctx || []
  console.log(e, effect)
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

const patch = (node, context) => {
  if (node.elementName.match(/Locomotor.Provider./)) {
    const [stack] = node.elementName.match(/([^Locomotor.Provider.])(.*)/g)
    updateProvider(stack, node.attributes)
  }
  node.context = context
}

// HORRAY!! pass the context through pocus
// so our function can use all hooks features
function createElement ({ elementName, attributes }) {
  // If keyed attributes exist unbind the elementName and map it to the key.
  // This should address function hooks thats go through Array mapping or
  const context = getContex(elementName)

  const node = pocus([attributes], context)
  
  if(node instanceof Promise) {
    node.then(n => patch(n, context))
  } else {
    patch(node, context)
  }

  lifeCycles.fn.set(context, { node, attributes, context })

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
