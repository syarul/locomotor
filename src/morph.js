import morphdom from 'morphdom'
import { nodeMap } from './renderer'

const traversal = node => {
  let checkNode
  while (node) {
    checkNode = node
    node = node.nextSibling
    if (checkNode.nodeType === 1) {
      if (nodeMap.a.has(checkNode)) {
        nodeMap.a.delete(checkNode)
      }
      traversal(checkNode.firstChild)
    }
  }
}

// const recreateNode = (el, withChildren) => {
//   if (withChildren) {
//     el.parentNode.replaceChild(el.cloneNode(true), el);
//   }
//   else {
//     var newEl = el.cloneNode(false);
//     while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
//     el.parentNode.replaceChild(newEl, el);
//   }
// }

const morph = (node, update) => {
  morphdom(node, update, {
    onNodeAdded: el => {
      // console.log(el)
      if (el.nodeType === 1 && nodeMap.has(el)){
        nodeMap.a.set(el, nodeMap.get(el))
      }
    },
    onBeforeElUpdated: (fromEl, toEl) => {
      // sane way to handle event listeners
      // console.log(nodeMap)
      if (nodeMap.has(toEl)) {
        const n = nodeMap.get(toEl)
        const o = nodeMap.a.get(fromEl)
        // console.log(o)
        // traversal(fromEl)
        // traversal(toEl)
        if (o) {
          for (const i in o) {
            fromEl.removeEventListener(i, o[i])
          }
        }
        // const newFromEl = fromEl.cloneNode(true)
        // fromEl.parentNode.replaceChild(newFromEl, fromEl)
        // recreateNode(fromEl, true)
        for (const i in n) {
          fromEl.addEventListener(i, n[i])
        }
        nodeMap.a.set(fromEl, n)
        nodeMap.delete(toEl)
      }
      // console.log(nodeMap)
      // spec - https://dom.spec.whatwg.org/#concept-node-equals
      if (fromEl.isEqualNode(toEl)) {
        return false
      }
      return true
    },
    onBeforeNodeDiscarded : node => {
      traversal(node)
    },
    childrenOnly: true
  })
}

export default morph
