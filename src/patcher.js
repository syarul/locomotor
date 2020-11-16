import { nodeMap, createEl, parseAttr } from './renderer'

const DOCUMENT_ELEMENT_TYPE = 1

// DOM patching method
// borrow some of the ideas from https://github.com/DylanPiercey/set-dom
// with the addition of handling input element

/* function isEqual (DOMnode, VDOMnode, eventStore) {
  // continue diffing if VDOMnode has children
  if (VDOMnode.children && VDOMnode.children.length) {
    return false
  }
  return (input(DOMnode, VDOMnode))
}

function input (DOMnode, VDOMnode) {
  console.log(nodeMap)
  if (DOMnode.nodeName !== 'INPUT') return

  // if (DOMnode.checked !== VDOMnode._checked) {
  //   DOMnode.checked = VDOMnode._checked
  // }
  // if (DOMnode.disabled !== VDOMnode._disabled) {
  //   DOMnode.disabled = VDOMnode._disabled
  // }
  // if (DOMnode.hasAttribute('autofocus')){
  //   DOMnode.focus()
  // }
  // if (DOMnode.value !== VDOMnode._value) {
  //   DOMnode.value = VDOMnode._value
  // }
}

function setAttributes (oldAttributes, newAttributes) {
  var i, a, b, ns, name

  // Remove old attributes.
  for (i = oldAttributes.length; i--;) {
    a = oldAttributes[i]
    ns = a.namespaceURI
    name = a.localName
    b = newAttributes.getNamedItemNS(ns, name)
    if (!b) oldAttributes.removeNamedItemNS(ns, name)
  }

  // Set new attributes.
  for (i = newAttributes.length; i--;) {
    a = newAttributes[i]
    ns = a.namespaceURI
    name = a.localName
    b = oldAttributes.getNamedItemNS(ns, name)
    if (!b) {
      // Add a new attribute.
      newAttributes.removeNamedItemNS(ns, name)
      oldAttributes.setNamedItemNS(a)
    } else if (b.value !== a.value) {
      // Update existing attribute.
      b.value = a.value
    }
  }
} */

/**
 * Dispatches a mount event for the given node and children.
 *
 * @param {Node} node - the node to mount.
 * @return {node}
 */
function mount(node) {
  return dispatch(node, 'mount')
}

/**
 * Dispatches a dismount event for the given node and children.
 *
 * @param {Node} node - the node to dismount.
 * @return {node}
 */
function dismount(node) {
  return dispatch(node, 'dismount')
}

/**
 * Recursively trigger an event for a node and it's children.
 * Only emits events for keyed nodes.
 *
 * @param {Node} node - the initial node.
 * @return {Node}
 */
function dispatch(node, type) {
  // Trigger event for this element if it has a key.
  if (getKey(node)) {
    var ev = document.createEvent('Event')
    var prop = { value: node }
    ev.initEvent(type, false, false)
    Object.defineProperty(ev, 'target', prop)
    Object.defineProperty(ev, 'srcElement', prop)
    node.dispatchEvent(ev)
  }

  // Dispatch to all children.
  var child = node.firstChild
  while (child) child = dispatch(child, type).nextSibling
  return node
}

const nodeStore = new (WeakMap || Map)()

function patch (DOMnode, VDOMnode) {
  if (Array.isArray(VDOMnode)) {
    // resolve in patch function
  } else {
    if (typeof VDOMnode === 'object') {
      const { elementName, attributes, children } = VDOMnode
      if (elementName === 'Locomotor.Fragment') {
        return diff(DOMnode, VDOMnode, true)
      }

      if (DOMnode.nodeType === DOCUMENT_ELEMENT_TYPE) {
        if(VDOMnode.render) {
          // console.log(DOMnode.isEqualNode(VDOMnode.render))
          // if (DOMnode.isEqualNode(VDOMnode.render)) return
        }
        if (DOMnode.nodeName === elementName.toUpperCase()) {

          Object.keys(attributes || {}).map(attr => {
            // if (typeof attributes[attr] === 'function') {
              // const ev = attr.replace(/^on/, '').toLowerCase()


              // onChange workaround for input keys event capturing
              // if (DOMnode.nodeName === 'INPUT' && ev === 'change') {
              //   DOMnode.removeEventListener('keyup', (nodeMap.get(DOMnode) || {}).keyup, false)
              //   DOMnode.removeEventListener('blur', (nodeMap.get(DOMnode) || {}).blur, false)
              // } else {
              //   DOMnode.removeEventListener(ev, (nodeMap.get(DOMnode) || {})[ev], false)
              // }
            // }
            parseAttr(DOMnode, attr, attributes[attr])
          })

          if (children && children.length) {
            // console.log(children)
            diff(DOMnode, VDOMnode)
          }
        } else {
          // nodeName is different
          const newDOMnode = createEl(VDOMnode).firstChild
          // store ref for DOMnode replacement
          nodeStore.set(DOMnode, newDOMnode)
          DOMnode.parentNode.replaceChild(newDOMnode, DOMnode)
        }
      }
    } else {
      if (DOMnode.nodeValue !== VDOMnode.toString()) {
        DOMnode.nodeValue = VDOMnode
      }
    }
  }
}

function getIndex (store, count, key) {
  if(key !== undefined) {
    const index = store.findIndex(n => n && n.attributes && n.attributes[key])
    if(!~index) {
      return store.length - count - 1
    }
    return index
  }
  return store.length - count - 1
}

function addExtra (count, oldParentNode, newStore) {
  let index
  while (count > 0) {
    count--
    index = getIndex(newStore, count)
    oldParentNode.appendChild(createEl(newStore[index]))
  }
}

function getKey (node) {
  return node.nodeType === DOCUMENT_ELEMENT_TYPE && node.getAttribute('key')
  // if(!key) return false
  // const target = store.find(n => n && n.attributes[key])
  // return target
}

function getKeyFromVtree(store) {
  return store && store.attributes && store.attributes['key']
}

let checkOld

function diff (oldParentNode, newParentNode, isFragment) {
  let DOMnode = isFragment ? oldParentNode : oldParentNode.firstChild

  let count = (newParentNode.children && newParentNode.children.length) || 0

  const newStore = newParentNode.children || []

  let index

  if (!DOMnode) {
    // if DOMnode is null process VDOMnode
    addExtra(count, oldParentNode, newStore)
  } else {
    while (DOMnode) {
      count--
      checkOld = DOMnode
      DOMnode = DOMnode.nextSibling
      index = getIndex(newStore, count)
      getKey(checkOld) && console.log(checkOld, newStore)
      if (checkOld && (newStore[index] !== undefined)) {
        if (Array.isArray(newStore[index])) {
          // exit when it's a list
          return diff(oldParentNode, { children: newStore[index] })
        } else {
          const oldKey = getKey(checkOld)
          // console.log(oldParentNode)
          if (!!oldKey) {
            const currentKey = getKeyFromVtree(newStore[index])
            // if checkOld key === vtree[index] attributes.key
            // --> ignore
            // if checkOld key !== vtree[index] attributes.key
            // --> find in from parentNode if exist and move here
            // then diff

            console.log(oldKey, currentKey)
            if (oldKey === currentKey) {
            //   // skip
            } else if (oldKey !== currentKey) {
              const checkNew = checkOld.parentNode.querySelector(`[key="${currentKey}"]`)
              console.log(checkNew)
            //   // console.log(checkNew)
            //   if(checkNew) {
            //     // console.log('do', oldKey, currentKey)
            //     checkOld.parentNode.insertBefore(checkNew, checkOld)
            //     // mount(checkNew)
            //   } else {
            //     patch(checkOld, newStore[index])
            //   }
              // checkNew.parentNode.insertBefore(checkNew, checkOld)
              // mount(checkNew)
            } else {
            //   // fallback
              // patch(checkOld, newStore[index])
            }
            patch(checkOld, newStore[index])
          } else {
            !!oldKey && console.log(oldKey)
            patch(checkOld, newStore[index])
          }
        }
      } else if (checkOld && (newStore[index] === undefined)) {
        if (nodeMap.has(checkOld)) {
          nodeMap.delete(checkOld)
        }
        oldParentNode.removeChild(checkOld)
      }
      if (DOMnode === null) {
        if (isFragment && oldParentNode.parentNode) {
          addExtra(count, oldParentNode.parentNode, newStore)
        } else if (isFragment && !oldParentNode.parentNode) {
          oldParentNode = nodeStore.get(oldParentNode)
          oldParentNode && addExtra(count, oldParentNode.parentNode, newStore)
          // remove ref from cache
          oldParentNode && nodeStore.delete(oldParentNode)
        } else {
          addExtra(count, oldParentNode, newStore)
        }
      }
    }
  }
}

function dompatcher (DOMnode, VDOMnode) {
  diff(DOMnode, VDOMnode)
}

export default dompatcher
