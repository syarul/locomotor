import { nodeMap } from './renderer'

const DOCUMENT_ELEMENT_TYPE = 1

// DOM patching method
// borrow some of the ideas from https://github.com/DylanPiercey/set-dom
// with the addition of handling input element

function isEqual (oldNode, newNode) {
  return (arbiter(oldNode, newNode) || oldNode.isEqualNode(newNode))
}

function arbiter (oldNode, newNode) {
  if (oldNode.nodeName !== 'INPUT') return
  if (oldNode.checked !== newNode.checked) {
    oldNode.checked = newNode.checked
  }
  if (oldNode.value !== newNode.value) {
    oldNode.value = newNode.value
  }
}

function setAttr (oldNode, newNode) {
  const oAttr = newNode.attributes
  const output = {}
  let i = 0
  while (i < oAttr.length) {
    output[oAttr[i].name] = oAttr[i].value
    i++
  }
  const iAttr = oldNode.attributes
  const input = {}
  let j = 0
  while (j < iAttr.length) {
    input[iAttr[j].name] = iAttr[j].value
    j++
  }
  for (const attr in output) {
    if (oldNode.attributes[attr] && oldNode.attributes[attr].name === attr && oldNode.attributes[attr].value !== output[attr]) {
      oldNode.setAttribute(attr, output[attr])
    } else {
      // add new attributes
      if (!oldNode.hasAttribute(attr)) {
        oldNode.setAttribute(attr, output[attr])
      }
    }
  }
  for (const attr in input) {
    // if attributes does not exist on the new node we removed it from the old node
    if (newNode.attributes[attr] && oldNode.attributes[attr]) {} else {
      oldNode.removeAttribute(attr)
    }
  }
}

function patch (oldNode, newNode) {
  if (oldNode.nodeType === newNode.nodeType) {
    if (oldNode.nodeType === DOCUMENT_ELEMENT_TYPE) {
      if (isEqual(oldNode, newNode)) return
      if (oldNode.nodeName === newNode.nodeName) {
        // handle eventListener we could use remove/add event listener too
        if ((oldNode.hasAttribute('key') && newNode.hasAttribute('key')) || nodeMap.has(newNode)) {
          nodeMap.has(newNode) && nodeMap.delete(newNode)
          oldNode.parentNode.replaceChild(newNode, oldNode)
        } else {
          setAttr(oldNode, newNode)
          diff(oldNode.firstChild, newNode.firstChild, oldNode)
        }
        // focus element if it last time was focused
        if(nodeMap.i.get(oldNode)) {
          nodeMap.i.delete(oldNode)
          // set focus
          newNode.focus()
          // set cursor position
          let val = newNode.value
          newNode.value = ''
          newNode.value = val
        }
      } else {
        diff(oldNode.firstChild, newNode.firstChild, oldNode)
      }
    } else {
      if (oldNode.nodeValue !== newNode.nodeValue) {
        oldNode.nodeValue = newNode.nodeValue
      }
    }
  } else {
    diff(oldNode.firstChild, newNode.firstChild, oldNode)
  }
}

function getIndex (store, count) {
  return store.length - count - 1
}

function addExtra (count, oldParentNode, newStore) {
  let index
  while (count > 0) {
    count--
    index = getIndex(newStore, count)
    oldParentNode.appendChild(newStore[index])
  }
}

let checkNew
let checkOld

function diff (oldNode, newNode, oldParentNode) {
  let count = 0
  const newStore = []

  while (newNode) {
    count++
    checkNew = newNode
    newNode = newNode.nextSibling
    newStore.push(checkNew)
  }

  let index

  if (!oldNode) {
    // if oldNode is null process newNode
    addExtra(count, oldParentNode, newStore)
  } else {
    while (oldNode) {
      count--
      checkOld = oldNode
      oldNode = oldNode.nextSibling
      index = getIndex(newStore, count)
      if (checkOld && newStore[index]) {
        patch(checkOld, newStore[index])
      } else if (checkOld && !newStore[index]) {
        oldParentNode.removeChild(checkOld)
      }
      if (oldNode === null) {
        addExtra(count, oldParentNode, newStore)
      }
    }
  }
}

function patcher (node, update) {
  diff(node.firstChild, update.firstChild, update)
}

export default patcher
