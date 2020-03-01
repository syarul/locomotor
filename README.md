# locomotor v0.1.8

[![npm package](https://img.shields.io/badge/npm-0.1.8-blue.svg)](https://www.npmjs.com/package/locomotor) [![browser build](https://img.shields.io/badge/unpkg-0.1.8-ff69b4.svg)](https://unpkg.com/locomotor@0.1.8/locomotor-min.js)

A React like hook without lingo

> Experimental stage

### What's this
Basically a view library which using function hooks through
- useReducer
- useState
- useEffect
- useLayoutEffect

Which powered by michael-klein's [hookuspocus](https://github.com/michael-klein/hookuspocus)

Some added features includes:-
- createContext
- useContext

### What's the different

- Internally it has ```React.memo``` immitation without using one and you don't need to use ```useCallback``` all over the place to handle efficient rendering. Function hooks are only called when state/props changed (*may need to add force render soon*).
- Reusable function hooks, you can import as many time elsewhere, and the library will isolate each hooks.
- Do not need ```key``` property when handling list/array mapping.
- May not need to ```import``` pragma on every js/jsx that need transpiling.
- It's only around 4kb gzip.

Some concern includes:-
- Event delegation is a bit wonky now, the patching simply replace the old node if it has eventListener attached.
- Test unit and mvc sample incoming.

### Quick Getting Start

Install with npm

```npm i locomotor```

or

clone repo [https://github.com/syarul/getting-start-locomotor](https://github.com/syarul/getting-start-locomotor)

check into the clone directory

```npm install && npm start```

### JSX cavets
If using caleb's [babel-plugin-transform-jsx](https://github.com/calebmer/node_modules/tree/master/babel-plugin-transform-jsx):-
- No Pragma
- No * @jsx * comments
- No createElement
- No $$typeof, props, key, ref, or other specific React lingo
- key is optional
- You can still pass props as usual to function hooks but not necessary

You don't need to add pragma import line to handle jsx transform on every files, ensure add `module` parameter to .babelrc plugins config
```json
{
  "plugins": [
    ["babel-plugin-transform-jsx", {
     "useVariables": true,
     "module": "locomotor"
    }]
  ]
}
```

Also support ```@babel/plugin-transform-react-jsx```. Just add pragma to .babelrc plugin config
```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "Locomotor"
    }]
  ]
}
```
then add import line to every ```*.js/*.jsx``` that needed tranformation.
```js
import Locomotor from 'locomotor'
```

Without jsx transformer you also can return your function hooks as js object instead
```js
{
  elementName: 'div',
  attributes: {},
  children: ['hello locomotor!']
}
```
Read [babel-plugin-transform-jsx](https://github.com/calebmer/node_modules/blob/master/babel-plugin-transform-jsx/README.md) for more info.

### Usage
```jsx
import { locoDOM, useState, useEffect } from 'locomotor'

function App (props) {

  const { label } = props || {}

  const [state, setState] = useState('foo')

  const click = () => {
    setState((state === 'foo' && 'bar') || 'foo')
  }

  useEffect(() => {
    console.log(`current state is ${state}`)
  }, [state])

  return (
    <button onClick={click}>
      {label} {state}
    </button>
  )
}

const props = {
  label: 'click me!'
}

locoDOM.render(
  <App {...props} />, 
  document.body
)

```

*Stole the original library name and move it elsewhere*
> p/s: previous locomotor animation moved to branch locomotor-animate