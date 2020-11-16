/* global Event */
import patch from './patcher'
import { setNode } from './provider'
// import { pocus, dataMap } from 'hookuspocus/src/core'
import { pocus, dataMap } from 'hookuspocus/dist/hookuspocus'
import './queue'
import { uuid } from './utils'

import isEqual from 'deep-equal'

export const vtreeDataMap = new (WeakMap || Map)()
vtreeDataMap.__contexts = new (WeakMap || Map)()

/** @type {Promise} */
let currentNode

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

/** @type {import('./').Func} */
const consume = c => c()

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

const diffVNode = (oldNode, newNode) => {
  if (typeof oldNode !== 'object') return

  if (oldNode.context && !newNode) {
    dataMap.delete(oldNode.context)

    const {
      stack,
      ctx,
      unboundContext
    } = getCurrentStack(oldNode.context) || {}

    if(!ctx) return

    delete ctx._hookStacks[stack]

    vtreeDataMap.set(unboundContext, ctx)

    vtreeDataMap.__contexts.delete(oldNode.context)

  }

  if (oldNode.constructor === Array) {
    oldNode.map((c, i) =>
      diffVNode(c, newNode && newNode[i])
    )
  }

  const { children } = oldNode

  if (children && children.length) {
    children.map((c, i) =>
      diffVNode(c, newNode && newNode.children[i])
    )
  }
}

// capture onStateChanged handler from hookuspocus/on
export const hydrate = context => {
  const {
    stack,
    currentStack,
    unboundContext
  } = getCurrentStack(context) || {}

  const { _node, _props, _event, _domNode } = currentStack

  currentNode = pocus([_props], context)

  updateComponent(unboundContext, stack, {
    _node: currentNode
  })

  _domNode && _domNode.dispatchEvent(_event)

  // Promise.all([_node, currentNode]).then(([oldNode, newNode]) =>
  //   diffVNode(oldNode, newNode)
  // )
}

/**
 * hooks generation through isolating each
 * context reference, ideally we still need
 * to retrieve it again on each cycle generation,
 * due to certain context may get removed we also
 * need to do cleanup upon each cycles
 * @param {Function} component
 * @param {object} props
 */
const createComponent = (component, props) => {
  const componentData = vtreeDataMap.get(component) || {
    _hookStacks: {}
    // _hookGenerations: [],
    // _stackCurrentIndex: 0
  }

  const { key } = props

  const stackIndex =
    // retrieve last assigned stack key
    componentData._stackCurrentIndex ||
    // if current context attributes has key prop
    // we used that instead
    (key !== undefined && key) ||
    // assign default index `0` on 1st generation
    0

  const eventStackKey = uuid()

  const currentStack = componentData._hookStacks[stackIndex] || {
    _index: stackIndex,
    _component: component.bind({}),
    _eventStackKey: eventStackKey,
    _event: new Event(eventStackKey),
    // internal element patching listener
    _patchDOMnode: function () {
      currentNode.then(node => {
        patch(this, node)

        clearTimeout(interval)
        interval = setTimeout(() => {
          subscribers.map(consume)
        }, 100)
      })
    }
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
  // store the attributes and the output element
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
    let i = 0
    const len = node.length
    const nodeArrays = []
    while (i < len) {
      nodeArrays.push(
        walk(node[i])
      )
      i++
    }
    return Promise.all(nodeArrays)
    // return Promise.all(node.map(walk))
  } else {
    if (typeof node.elementName === 'function') {
      return Promise.resolve(createElement(node))
    }
    return Promise.all([
      node.elementName,
      node.attributes,
      walk(node.children),
      node.context ? node.context : null,
      node.render ? node.render : null
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
