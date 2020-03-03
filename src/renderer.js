import patch from './patch'
import { lifeCyclesRunReset } from './walk'

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
nodeMap.i = new (WeakMap || Map)()

function evt (el, attr, value) {
  attr = attr.replace(/^on/, '').toLowerCase()
  // set change as keyup
  attr = (attr === 'change' && 'keyup') || attr
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

const createEl = async (vtree, fragment) => {
  fragment = fragment || document.createDocumentFragment()
  if (vtree === null) return fragment
  if (vtree instanceof Promise) {
    vtree = await vtree
  }
  const { elementName, attributes, children, context } = vtree
  let node = null
  if (typeof vtree === 'object') {
    if (Array.isArray(vtree)) {
      Array.from(vtree, vnode => createEl(vnode, fragment))
    } else {
      // if (!elementName) return fragment
      if (context) {
        // handle element with context, we need to attach listener
        // on dismount to clean all side effects - tba
      }
      // handle fragment
      if (elementName === 'Locomotor.Fragment') {
        await Promise.all(Array.from(children, async child => createEl(child, fragment)))
      // handle provider
      } else if (elementName.match(/Locomotor.Provider./)) {
        await Promise.all(Array.from(children, async child => createEl(child, fragment)))
      } else {
        node = document.createElement(elementName)
        // catch focus input
        if (node.nodeName === 'INPUT') {
          node.addEventListener('focus', () =>
            nodeMap.i.set(node, true)
          , false)
        }
        Array.from(Object.keys(attributes), attr => parseAttr(node, attr, attributes[attr]))
      }
    }
  } else {
    node = document.createTextNode(vtree)
  }
  if (children && children.length) {
    await Promise.all(Array.from(children, async child => createEl(child, node)))
  }
  node && fragment.appendChild(node)
  return fragment
}

const resolveVtree = async vtree => {
  if (vtree instanceof Promise) {
    return vtree.then(resolveVtree)
  } 
  if (Array.isArray(vtree)) {
    return Promise.all(Array.from(vtree, resolveVtree))
  } else {
    let { elementName, children } = vtree
    if (elementName instanceof Promise) {
      elementName = await elementName
    }

    children = await Promise.all(
      (children || []).map(async child => {
        if (child instanceof Promise) {
          child = await child
        }
        child = await resolveVtree(child)
        return child
      })
    )
    
    return {
      ...vtree,
      elementName,
      children
    }
  }

}

class Renderer {
  async render (vtree, rootNode) {
    console.log(vtree)
    await resolveVtree(vtree)
    this.r = rootNode
    if (vtree instanceof Promise) {
      vtree = await vtree
    }
    const node = await createEl(vtree)
    rootNode.appendChild(node)
    this.emit('init')
  }

  deffer () {
    return new Promise(resolve => resolve(this.r))
  }

  emit (lifecycle) {
    this.deffer().then(() =>
      lifeCyclesRunReset(lifecycle)
    )
  }

  async on (vtree) {
    const node = await createEl(vtree)
    patch(this.r, node)
    this.emit('update')
  }
}

const locoDOM = new Renderer()

const vtreeRender = vtree => locoDOM.on(vtree)

export {
  locoDOM as default,
  nodeMap,
  vtreeRender
}
