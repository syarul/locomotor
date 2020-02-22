# locomotor v0.1.0

[![npm package](https://img.shields.io/badge/npm-0.1.0-blue.svg)](https://www.npmjs.com/package/locomotor) [![browser build](https://img.shields.io/badge/rawgit-0.1.0-ff69b4.svg)](https://cdn.rawgit.com/syarul/locomotor/master/locomotor-min.js)

A react hook without lingo

> Experimental stage

Install with npm

```npm i locomotor```

### What's this
Basically a strip version of react while using function hooks through
- useReducer
- useState
- useEffect
- useLayoutEffect

Which power by michael-klein's [hookuspocus](https://github.com/michael-klein/hookuspocus)

### JSX cavets
Using caleb's [babel-plugin-transform-jsx](https://github.com/calebmer/node_modules/tree/master/babel-plugin-transform-jsx), with cavets:-
- No Pragma
- No * @jsx * comments
- No createElement
- No $$typeof, props, key, ref, or other specific React lingo
- key is optional
- You can still pass props as usual to function hooks
- Component is not supported, but you can still use classes but it's not needed

### Usage
```jsx
import locomotor, { useState, useEffect } from 'locomotor'

function App(props){

  const { label } = props || {}

  const [state, setState] = useState('foo')

  const click = () => {
    setState((state === 'foo' && 'bar') || 'foo')
  }

  useEffect(() => {
    console.log(`current state is ${state}`)
  }, [state])

  return (
    <button onClick={click}>{label} {state}</button>
  )
}

const props = {
  label: 'click me!'
}

locomotor.render(
  <App {...props} />, 
  document.body
)

```

*Stole the original library name and move it elsewhere*
> p/s: previous locomotor animation moved to branch locomotor-animate