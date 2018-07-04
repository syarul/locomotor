# locomotor
A smooth and FPS friendly animation library

> install with npm

```npm i locomotor```

# current features
- render according to the browser fps
- animation is adjusted base on the fps for smoother transition and less jerky at times
- animate css property
- data only come from array (min, max) *will support more feature like custom vector path in the future*
- less configuration

# usage
```javascript
const locomotor = require('locomotor')
new locomotor(node, prop, options)
```
- **node**: *(string)* ***required*** DOM node id reference
- **prop**: *(object)* ***required*** the animation property
- **options**: *(object)* ***optional*** the animation options

```javascript
const Locomotor = require('locomotor')

const lm = new Locomotor('myNode', {
  tranform: step => `translate(${step}px, 0)`
}, {
  data: [ -1090, 255 ]
})
```

