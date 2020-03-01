import { walk } from './src/walk'

/**
  * Pick up the jsx element with caleb's transform-jsx
  * https://github.com/calebmer/node_modules/tree/master/babel-plugin-transform-jsx
  * You don't need to add import line to handle jsx transform on every files, just
  * ensure add `module` parameter to babel plugins config
  * {
  *   ...
  *   "plugins": [
  *     ["babel-plugin-transform-jsx", {
  *      "useVariables": true,
  *      "module": "locomotor"
  *     }]
  *   ]
  * }
  *
  * Also support @babel/plugin-transform-react-jsx
  * set babel plugins config to :-
  * {
  *   ...
  *   "plugins": [
  *     ["@babel/plugin-transform-react-jsx", {
  *       "pragma": "Locomotor"
  *     }]
  *   ]
  * }
  * then add import line to every *.js/*.jsx that need tranformation
  * `import Locomotor from 'locomotor'`
  */
const locomotor = function (elementName, attributes, ...children) {
  // caleb's transform-jsx
  if (typeof elementName !== 'function') {
    return walk(elementName)
  }
  // @babel/plugin-transform-react-jsx
  return walk({
    elementName,
    attributes: attributes || {},
    children: children || []
  })
}

export default locomotor
