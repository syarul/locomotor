import { batchRender, createEl, nodeMap } from './renderer'
import { updateProvider } from './provider'
import { pocus, dataMap } from 'hookuspocus/src/core'
import { comitQueue } from './queue'
import { isEqual, loop, filter } from './utils'
import patch from './patch'

// lifeCycles store
export const lifeCycles = new (WeakMap || Map)()
lifeCycles.gen = new (WeakMap || Map)()
lifeCycles.stack = new (WeakMap || Map)()
lifeCycles.base = []
lifeCycles.fn = new (WeakMap || Map)()
lifeCycles.c = []

const dispatch = (context, ctx, n, p, o) => {
  const v = createEl(n)
  lifeCycles.fn.set(context, {
    ...ctx,
    n,
    p,
    o,
    v
  })
  // dispatch event for this context
  // where patching will assume
  ctx.v.dispatchEvent(o)
}

export const hydrate = context => {
  const { p, o, ...ctx } = lifeCycles.fn.get(context)
  const n = pocus([p], context)
  if(n instanceof Promise) {
    n.then(n => {
      dispatch(context, ctx, n, p, o)
    })
  } else {
    dispatch(context, ctx, n, p, o)
  }
}

const setNode = (node, ctx, context, attributes) => {

  const v = createEl(node)

  console.log(node)

  const o = ctx.o || new Event('__context__')

  const e = () => {
    const ctx = lifeCycles.fn.get(context)
    console.log(ctx, 'event called!')
    ctx.v.addEventListener(o.type, e)
    patch(v.parentNode, ctx.v)
  }

  v.addEventListener(o.type, e)

  // store the attributes and the output element
  lifeCycles.fn.set(context, {
    n: node,
    p: attributes,
    o,
    e,
    v
  })

  if (node.elementName.match(/Locomotor.Provider./)) {
    const [stack] = node.elementName.match(/([^Locomotor.Provider.])(.*)/g)
    updateProvider(stack, node.attributes)
  }
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
  const ctx = lifeCycles.fn.get(context) || {} 
  const setFullNode = node => setNode(node, ctx, context, attributes)
  const { n, p } = ctx
  // return memoize node if status is pristine and props unchanged
  let node = null
  if (isEqual(p, attributes)) {
    node = n
  } else {
    node = pocus([attributes], context)
  }
  node.setNode = setFullNode
  console.log(node)
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
