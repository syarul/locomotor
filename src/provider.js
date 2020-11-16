// import { hookus } from 'hookuspocus/src/core'
// import { useReducer } from 'hookuspocus/src/use_reducer'
import { hookus, useReducer } from 'hookuspocus/dist/hookuspocus'
import { createEl } from './renderer'

const providerMap = new (WeakMap || Map)()
providerMap.h = []
providerMap.c = []
providerMap.d = new (WeakMap || Map)()
providerMap.u = []

const updateProvider = (stack, attributes) => {
  const value = providerMap.get(providerMap.h[stack]) || {}
  let consumer = { ...value }
  for (const attr in attributes) {
    if (typeof attributes[attr] === 'object') {
      consumer = { ...consumer, ...attributes[attr] }
    } else {
      consumer[attr] = attributes[attr]
    }
  }
  const provider = providerMap.d.get(providerMap.h[stack])
  // register provider, consume at the next cycle
  providerMap.c.push(provider.bind(null, consumer))
}

export const createContext = (value = {}) => {
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

export const useContext = hookus((data, context) => {
  data.s = data.s !== undefined ? data.s : (providerMap.get(context) || {})
  const cb = (_, action) => {
    data.s = action
    return data.s
  }
  const [state, dispatch] = useReducer(cb, data.s)
  providerMap.d.set(context, action => dispatch(action))
  return state
})

export const setNode = (node, context) => {
  node.context = context
  if (node.elementName.match(/Locomotor.Provider./)) {
    const [stack] = node.elementName.match(/([^Locomotor.Provider.])(.*)/g)
    updateProvider(stack, node.attributes)
  }
  // node.render = createEl(node).firstChild
}
