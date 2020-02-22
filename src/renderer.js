import patch from './patch'

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

function classes (el, attr, value) {
  if (typeof value === 'object') {
    el.setAttribute('class', Object.keys(value)
      .filter(c => value[c])
      .map(c => c)
      .join(' ')
    )
  } else {
    el.setAttribute('class', value)
  }
}

const nodeMap = new (WeakMap || Map)()

function evt (el, attr, value) {
  el.addEventListener(attr.replace(/^on/, '').toLowerCase(), value, false)
  // on subsequent run we patch the node through WeakMap
  nodeMap.set(el, true)
}

function parseAttr (el, attr, value) {
  if (typeof value === 'function' && attr.match(/^on/)) {
    return evt.apply(null, arguments)
  } else if (attr === 'className' || attr === 'class') {
    return classes.apply(null, arguments)
  } else if (attr === 'style' && typeof value === 'object') {
    return el.setAttribute(attr, styleToStr(value))
  } else if (typeof value === 'boolean') {
    return value && el.setAttribute(attr, '')
  } else {
    return el.setAttribute(attr, value)
  }
}

function createEl (vtree, fragment) {
  fragment = fragment || document.createDocumentFragment()
  if (vtree === null) return fragment
  const { elementName, attributes, children } = vtree
  let node = null
  if (typeof vtree === 'object') {
    node = document.createElement(elementName)
    Object.keys(attributes).map(attr => parseAttr(node, attr, attributes[attr]))
  } else {
    node = document.createTextNode(vtree)
  }
  if (children && children.length) {
    children.map(child => createEl(child, node))
  }
  fragment.appendChild(node)
  return fragment
}

function handler (vtree, mount, transform, handle) {
  vtree instanceof Promise
    ? vtree.then(v => handle(mount, transform(v)))
    : handle(mount, transform(vtree))
  return mount
}

class Renderer {
  render (...args) {
    this.rootNode = handler(
      ...args,
      createEl,
      (rootNode, vnode) => rootNode.appendChild(vnode)
    )
  }

  on (vtree) {
    handler(vtree, this.rootNode, createEl, patch)
  }
}

const locoDOM = new Renderer()

const vtreeRender = vtree => locoDOM.on(vtree)

export {
  locoDOM as default,
  nodeMap,
  vtreeRender
}