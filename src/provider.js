
import { hookus, pocus } from 'hookuspocus/src/core'
import { useReducer } from 'hookuspocus/src/use_reducer'
import { on } from 'hookuspocus/src/on'
import { lifeCycles, contextUpdate } from './walk'

export const providerMap = new (WeakMap || Map)()
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
}

const _onUseReducer = cb =>
  on(useHigherOrderReducer, (data, reducer, initialArg, init) => {
    const [state, dispatch] = data.hook(data, reducer, initialArg, init)
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

// _onUseReducer(context => {
//   
// })

export const useHigherOrderReducer = hookus((data, reducer, initialArg, init) => {
  data.s = data.s !== undefined ? data.s : init ? init(initialArg) : initialArg
  return [
    data.s,
    action => {
      data.s = reducer(data.s, action)
      providerMap.u.push(data.context)
      // const ctx = lifeCycles.fn.get(data.context)
      // let node = pocus([ctx.p], data.context)
      // console.log(node)
      // console.log(contextUpdate)
      contextUpdate(data.context, 'foo')
      return data.s
    }
  ]
})
