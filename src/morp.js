import morphdom from 'morphdom'
import { nodeMap } from './renderer'

const morp = (node, update) => {
  console.log(update)
  morphdom(node, update, {
    getNodeKey: function (node) {
      return node.key
    },
    // onBeforeElUpdated: function (fromEl, toEl) {
    //   // spec - https://dom.spec.whatwg.org/#concept-node-equals
    //   if (fromEl.isEqualNode(toEl)) {
    //     return false
    //   }

    //   return true
    // }
    onNodeAdded: node => {
      console.log(node)
    }
  })
}

export default morp
