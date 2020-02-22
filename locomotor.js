import walk from './src/walk'

const locomotor = function (virtualNode) {
  /**
     * Pick up the virtual node by caleb transform-jsx
     * https://github.com/calebmer/node_modules/tree/master/babel-plugin-transform-jsx
     * Stript version of jsx transform, cavets:-
     *    - No Pragma
     *    - No * @jsx * comments
     *    - No createElement
     *    - No $$typeof, props, key, ref, or other specific React lingo
     *    - Key is still supported although it is optional
     *    - We use useVariable to support component element names
     *    - Well the lacks of error handling messages (*remedies tba)

     * ==================
     * life-cycle staging
     * ==================
     * walk vtree to generate virtual nodes tree
     */

  return walk(virtualNode)
}

export default locomotor
