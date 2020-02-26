# locomotor v0.1.5

[![npm package](https://img.shields.io/badge/npm-0.1.5-blue.svg)](https://www.npmjs.com/package/locomotor) [![browser build](https://img.shields.io/badge/unpkg-0.1.5-ff69b4.svg)](https://unpkg.com/locomotor@0.1.5/locomotor-min.js)

A react hook without lingo

> Experimental stage

Install with npm

```npm i locomotor```

### Quick Getting Start

clone repo [https://github.com/syarul/getting-start-locomotor](https://github.com/syarul/getting-start-locomotor)

check into the clone directory

```npm install && npm start```

### What's this
Basically a strip version of react while using function hooks through
- useReducer
- useState
- useEffect
- useLayoutEffect

Which powered by michael-klein's [hookuspocus](https://github.com/michael-klein/hookuspocus)

- Internally it has ```React.memo``` immitation without using one and having to use ```useCallback``` all over the place to handle efficient rendering.
- Event delegation is a bit wonky now, the patching simply replace the old node if it has eventListener attached.
- Now properly handle keyed element with property ```key```.
- Reusable hooks not yet tested.

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