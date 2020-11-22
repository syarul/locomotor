import { getCurrentStack, lifecycleUpdate } from './walk'

// import patch from './patcher'

import { create, h, patch, diff } from 'virtual-dom'

// function render(count) {
//   return h('div', {
//     style: {
//       textAlign: 'center',
//       lineHeight: (100 + count) + 'px',
//       border: '1px solid red',
//       width: (100 + count) + 'px',
//       height: (100 + count) + 'px'
//     }
//   }, [String(count)]);
// }

// console.log(typeof cv)

function camelCase (s, o) {
  return `${s.replace(/([A-Z]+)/g, '-$1').toLowerCase()}:${o[s]};`
}

function styleToStr (obj) {
  let style = ''
  for (const attr in obj) {
    style += camelCase(attr, obj)
  }
  return style
}

function classes (el, value) {
  if (typeof value === 'object') {
    el.setAttribute('class', Object.keys(value).map(i => value[i]).join(' '))
  } else {
    el.setAttribute('class', value)
  }
}

const nodeMap = new (WeakMap || Map)()

function evt (el, attr, value) {
  attr = attr.replace(/^on/, '').toLowerCase()

  const cur = nodeMap.get(el) || {}

  // react like onChange handler
  if (el.nodeName === 'INPUT' && attr === 'change') {
    cur.keyup !== value && el.addEventListener('keyup', value, false)
    cur.blur !== value && el.addEventListener('blur', value, false)

    if (cur.keyup !== value || cur.blur !== value) {
      nodeMap.set(el, {
        ...cur,
        keyup: value,
        blur: value
      })
    }

    return false
  }

  // initial event handler
  cur[attr] !== value && el.addEventListener(attr, value, false)

  // on subsequent run we patch the node through WeakMap
  if (cur[attr] !== value) {
    nodeMap.set(el, {
      ...cur,
      [attr]: value
    })
  }
}

function parseAttr (el, attr, value) {
  if (typeof value === 'function' && attr.match(/^on/)) {
    evt.apply(null, arguments)
  } else if (attr === 'className' || attr === 'class') {
    classes(el, value)
  } else if (attr === 'style' && typeof value === 'object') {
    el.setAttribute(attr, styleToStr(value))
  } else if (attr === 'value') {
    el.value = value
  } else if (typeof value === 'boolean') {
    const types = ['checked', 'selected', 'disabled'].includes(attr)
    if (types) {
      el[attr] = !!value
    }
    value && el.setAttribute(attr, '')
  } else {
    el.setAttribute(attr, value)
  }
}

const createEl = (vtree, fragment) => {
  fragment = fragment || document.createDocumentFragment()
  if (vtree === null) return fragment
  const { elementName, attributes, children } = vtree
  const createFrom = vnode => createEl(vnode, fragment)
  let node = null
  if (typeof vtree === 'object') {
    if (Array.isArray(vtree)) {
      vtree.map(createFrom)
    } else {
      // handle fragment
      if (elementName === 'Locomotor.Fragment') {
        children.map(createFrom)
      // handle provider
      } else if (elementName.match(/Locomotor.Provider./)) {
        children.map(createFrom)
      } else {
        node = document.createElement(elementName)
        Object.keys(attributes).map(attr => parseAttr(node, attr, attributes[attr]))
      }
    }
    if (vtree.context) {
      setStackListener(vtree, node)
    }
  } else {
    node = document.createTextNode(vtree)
  }
  if (children && children.length) {
    children.map(child => createEl(child, node))
  }
  node && fragment.appendChild(node)
  return fragment
}

const setStackListener = (vtree, node) => {
  const { currentStack } = getCurrentStack(vtree.context, node) || {}
  const { _eventStackKey, _patchDOMnode } = currentStack
  _eventStackKey && _patchDOMnode && node && node.addEventListener(_eventStackKey, _patchDOMnode, false)
}

const updateNodes = vtree => {
  if (vtree === null) return
  const { elementName, attributes, children } = vtree
  const node = null
  if (typeof vtree === 'object') {
    if (Array.isArray(vtree)) {
      vtree.map(updateNodes)
    } else {
      // handle fragment
      if (elementName === 'Locomotor.Fragment') {
        children.map(updateNodes)
        // handle provider
      } else if (elementName.match(/Locomotor.Provider./)) {
        children.map(updateNodes)
      } else {
        // const nvtree = h(vtree)
        // const rootNode = create(nvtree)
      }
    }
    if (vtree.context) {
      getCurrentStack(vtree.context, node)
    }
  }
  if (children && children.length) {
    children.map(updateNodes)
  }
}

const locoDOM = {
  render: function (vnode, mountNode) {
    vnode.then(node => {
      const vtree = h(node)
      const rootNode = create(vtree)
      getCurrentStack(node.context, rootNode)
      // updateNodes(vtree)
      // lifecycleUpdate(VTree, rootNode) // broadcast vtree and rootNode
      // setStackListener(v, rootNode) // set root event handler
      mountNode.appendChild(rootNode)
    })
  }
}

export {
  locoDOM as default,
  nodeMap,
  createEl,
  parseAttr
}
