import { setNode } from './provider'
import { pocus, dataMap } from 'hookuspocus/src/core'
// import { pocus, dataMap } from 'hookuspocus/dist/hookuspocus'
import './queue'
import { h, patch, diff, create } from 'virtual-dom'
import isEqual from 'deep-equal'

export const vtreeDataMap = new (WeakMap || Map)()
vtreeDataMap.__contexts = new (WeakMap || Map)()

/** @type {number} */
let interval

/** @typedef {import('./').Stack} Stack */

/** @type {import('./').Subscribers} */
let subscribers = []

/** @type {import('./').Func} */
export const act = (run, clear) => {
  subscribers.push(run)
  if (clear) subscribers = []
}

/**
 * Retrieved stored context data, also update 
 * Document NodeElement ref if supplied
 * @param {*} context 
 * @param {*} node 
 */
export const getCurrentStack = (context, node) => {
  // get the original unbound context
  const unboundContext = vtreeDataMap.__contexts.get(context)
  // get actual vtree dataMap generated from this unbound context
  const ctx = vtreeDataMap.get(unboundContext)

  if (!ctx) {
    return false
  }

  // lookup for the the current stack
  for (const stack in ctx._hookStacks) {
    const { _component } = ctx._hookStacks[stack]
    if (_component === context) {
      if (node) {
        ctx._hookStacks[stack]._domNode = node
        vtreeDataMap.set(unboundContext, ctx)
      }

      return {
        stack,
        ctx,
        currentStack: ctx._hookStacks[stack],
        unboundContext
      }
    }
  }
}

/**
 * Due to certain context may get removed we also
 * need to do cleanup upon each cycles
 * @param {*} oldNode 
 * @param {*} newNode 
 */
const cleanUpContext = (oldNode, newNode) => {
  if (typeof oldNode !== 'object') return

  if (oldNode.context && !newNode) {
    dataMap.delete(oldNode.context)

    const {
      stack,
      ctx,
      unboundContext
    } = getCurrentStack(oldNode.context) || {}

    if (!ctx) return

    delete ctx._hookStacks[stack]

    vtreeDataMap.set(unboundContext, ctx)

    vtreeDataMap.__contexts.delete(oldNode.context)
  }

  if (oldNode.constructor === Array) {
    oldNode.map((c, i) =>
      cleanUpContext(c, newNode && newNode[i])
    )
  }

  const { children } = oldNode

  if (children && children.length) {
    children.map((c, i) => {
      const nChild = newNode && newNode.children && newNode.children[i]
      nChild && cleanUpContext(c, nChild)
    })
  }
}

const resetStack = node => {
  if (typeof node !== 'object') return

  if (node.context) {
    const {
      ctx,
      unboundContext
    } = getCurrentStack(node.context) || {}

    if (!ctx) return

    ctx._stackCurrentIndex !== undefined && (ctx._stackCurrentIndex = 0)

    vtreeDataMap.set(unboundContext, ctx)

  }

  if (node.constructor === Array) {
    node.map(resetStack)
  }

  const { children } = node

  if (children && children.length) {
    children.map(resetStack)
  }
}

/**
 * capture onStateChanged handler from hookuspocus/on
 * @param {*} context 
 */
export const hydrate = context => {
  const {
    stack,
    currentStack,
    unboundContext
  } = getCurrentStack(context) || {}

  const { _node, _props, _domNode } = currentStack

  _node.then(oldNode => {
    
    resetStack(oldNode)

    pocus([_props], context).then(newNode => {

      cleanUpContext(oldNode, newNode)

      newNode.render = h(newNode)
      // update
      updateComponent(unboundContext, stack, {
        _node: Promise.resolve(newNode)
      })

      const patches = diff(oldNode.render, newNode.render)

      patch(_domNode, patches)

      if (subscribers.length) {
        clearTimeout(interval)
        interval = setTimeout(() =>
          subscribers.map(requestAnimationFrame)
        )
      }
    })

  })

  /* Promise.all([
    _node, 
    pocus([_props], context)
  ]).then(([oldNode, newNode]) => {

    cleanUpContext(oldNode, newNode)

    newNode.render = h(newNode)
    // update
    updateComponent(unboundContext, stack, {
      _node: Promise.resolve(newNode)
    })

    const patches = diff(oldNode.render, newNode.render)
 
    patch(_domNode, patches)

    if (subscribers.length) {
      clearTimeout(interval)
      interval = setTimeout(() =>
        subscribers.map(requestAnimationFrame)
      )
    }
  }) */
}

/**
 * hooks generation through isolating each
 * context reference, ideally we still need
 * to retrieve it again on each cycle generation
 * @param {Function} component
 * @param {object} props
 */
const createComponent = (component, props) => {
  const componentData = vtreeDataMap.get(component) || {
    _hookStacks: {}
    // _stackCurrentIndex: 0
  }

  const { key } = props

  const stackIndex =
    // retrieve last assigned stack key
    componentData._stackCurrentIndex ||
    // if current context attributes has key prop
    // we used that instead
    (key !== undefined && key) ||
    // assign default index `0` on first time generation
    0

  const currentStack = componentData._hookStacks[stackIndex] || {
    _index: stackIndex,
    _component: component.bind({})
  }

  // first time generation
  !componentData._hookStacks[stackIndex] && (componentData._hookStacks[stackIndex] = currentStack)

  // if a key was unavailable we increase the stack
  // count so a subsequent call using the reference
  // will not get duplicated
  key === undefined && (componentData._stackCurrentIndex = stackIndex + 1)

  vtreeDataMap.set(component, componentData)

  vtreeDataMap.__contexts.set(currentStack._component, component)

  return currentStack
}

/**
 * @param {function} unboundComponent
 * @param {Stack} stackIndex
 * @param {object} newProps
 */
const updateComponent = (unboundComponent, stackIndex, newProps) => {
  const vcomponent = vtreeDataMap.get(unboundComponent)

  const componentStack = vcomponent._hookStacks[stackIndex]

  for (const i in newProps) {
    componentStack[i] = newProps[i]
  }

  vcomponent._hookStacks[stackIndex] = componentStack

  vtreeDataMap.set(unboundComponent, vcomponent)
}

/**
 * construct vtree from hook function
 * @param {*} param
 */
const createElement = ({ elementName, attributes }) => {
  const {
    _index,
    _component,
    _node,
    _props
  } = createComponent(elementName, attributes)

  let node = null

  // return memoize node if status is pristine and props unchanged
  if (isEqual(_props, attributes)) {
    node = _node
  } else {
    node = pocus([attributes], _component)
  }
  const setNodeWithContext = node => setNode(node, _component)
  node instanceof Promise ? node.then(setNodeWithContext) : setNodeWithContext(node)
  // store the attributes
  updateComponent(elementName, _index, {
    _node: node,
    _props: attributes
  })

  node.context = _component

  return node
}

// render node
//   - render(node)
//   - reset stack = 0
//   - if component.hooks ->
//       - pendingEffects run cleanup
//       - pendingEffects run invoke
//       - pendingEffects clear

// patch node
//   - if oldnode -> oldNode(node)
//   - pendingEffects -> renderDiffer -> run effects

// commitToRenderQueue ??

// unmountFrom
//   - unmount(node)
//   - pendingEffects run cleanup

// resolve all promises in vtree object
// thanks to @Bergi https://stackoverflow.com/users/1048572/bergi for the help
export const walk = node => {
  if (typeof node !== 'object' || node == null) {
    return Promise.resolve(node)
  } else if (node instanceof Promise) {
    return node.then(n => {
      node.context && (n.context = node.context)
      return walk(n)
    })
  } else if (node.constructor === Array) {
    return Promise.all(node.map(walk))
  } else {
    if (typeof node.elementName === 'function') {
      return Promise.resolve(createElement(node))
    }
    return Promise.all([
      node.elementName,
      node.attributes,
      walk(node.children),
      node.context,
      node.render
    ]).then(([elementName, attributes, children, context, render]) => {
      return {
        elementName,
        attributes,
        children,
        context,
        render
      }
    })
  }
}

// render VDOM to actual DOM
export const locoDOM = {
  render: function (vnode, mountNode) {
    vnode.then(node => {
      // console.log(node)
      mountNode.appendChild(create(h(node), null, getCurrentStack))
    })
  }
}
