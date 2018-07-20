# locomotor v0.0.9

[![npm package](https://img.shields.io/badge/npm-0.0.9-blue.svg)](https://www.npmjs.com/package/locomotor) [![browser build](https://img.shields.io/badge/rawgit-0.0.9-ff69b4.svg)](https://cdn.rawgit.com/syarul/locomotor/master/locomotor-min.js)

A smooth and FPS friendly animation library

> install with npm

```npm i locomotor```

# current features
- render according to the browser fps
- animation is adjusted base on the fps for smoother transition and less jerky at times
- animate css property
- simple data with min and max value
- less configuration
- has multitude easing options
- has advance setup where you can write your own custom animation

# Usage
```javascript
import Locomotor from 'locomotor'
new Locomotor(node, prop, options)
```
- **node**: *(string)* ***required*** DOM node id reference
- **prop**: *(object)* ***required*** the animation property
- **options**: *(object)* ***optional*** the animation options

```javascript
import Locomotor from 'locomotor'

const lm = new Locomotor('myNode', {
  transform: step => `translate(${step}px, 0)`
}, {
  data: [ -1090, 255 ]
})

lm.run()

// to stop 
// lm.stop()
```

# Options Parameters
| options       | type          | info          |
| ------------- |:------:|:-------------:|
| **fps** | int | the frame per seconds for the animation, default is 60 |
| **duration** | int | use this to stop the animation after the duration finish |
| **interval** | int | the interval of the animation, higher mean faster animation, default is 1 |
| **data** | array | the animation min and max value i.e [ min, max ] |
| **easing** | string/array | see [easing list](#easing-features) or provide an array of custom easing in [mX1, mY1, mX2, mY2] |
| **advanceSetup** | function | custom animation, checkout [this sample](https://github.com/syarul/locomotor/blob/master/examples/sample-transform-2.js) for usage case |
| **debug** | boolean | debugging info which print fps to console |
| **debugNode** | string | instead of console, print debugging info to a DOM node |

# Easing Features

  - ease : [0.25, 0.1, 0.25, 1.0]
  - linear : [0.00, 0.0, 1.00, 1.0]
  - easeIn : [0.42, 0.0, 1.00, 1.0]
  - easeOut : [0.00, 0.0, 0.58, 1.0]
  - easeInOut : [0.42, 0.0, 0.58, 1.0]
  - easeInCubic : [0.550, 0.055, 0.675, 0.190]
  - easeOutCubic : [0.215, 0.610, 0.355, 1.000]
  - easeInOutCubic : [0.645, 0.045, 0.355, 1.000]
  - easeInCirc : [0.600, 0.040, 0.980, 0.335]
  - easeOutCirc : [0.075, 0.820, 0.165, 1.000]
  - easeInOutCirc : [0.785, 0.135, 0.150, 0.860]
  - easeInExpo : [0.950, 0.050, 0.795, 0.035]
  - easeOutExpo : [0.190, 1.000, 0.220, 1.000]
  - easeInOutExpo : [1.000, 0.000, 0.000, 1.000]
  - easeInQuad : [0.550, 0.085, 0.680, 0.530]
  - easeOutQuad : [0.250, 0.460, 0.450, 0.940]
  - easeInOutQuad : [0.455, 0.030, 0.515, 0.955]
  - easeInQuart : [0.895, 0.030, 0.685, 0.220]
  - easeOutQuart : [0.165, 0.840, 0.440, 1.000]
  - easeInOutQuart : [0.770, 0.000, 0.175, 1.000]
  - easeInQuint : [0.755, 0.050, 0.855, 0.060]
  - easeOutQuint : [0.230, 1.000, 0.320, 1.000]
  - easeInOutQuint : [0.860, 0.000, 0.070, 1.000]
  - easeInSine : [0.470, 0.000, 0.745, 0.715]
  - easeOutSine : [0.390, 0.575, 0.565, 1.000]
  - easeInOutSine : [0.445, 0.050, 0.550, 0.950]
  - easeInBack : [0.600, -0.280, 0.735, 0.045]
  - easeOutBack : [0.175, 0.885, 0.320, 1.275]
  - easeInOutBack : [0.680, -0.550, 0.265, 1.550]

# Examples
 View with [parcel](https://github.com/parcel-bundler/parcel) by running ```parcel examples/index.html```

