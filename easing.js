/**
 * Utility to apply easing to KeySpline.js by Gaëtan Renaudeau(https://twitter.com/greweb)
*/

var KeySpline = require('./external/KeySpline')

var ease = {
    // Classic Easing
  'ease': [0.25, 0.1, 0.25, 1.0],
  'linear': [0.00, 0.0, 1.00, 1.0],
  'easeIn': [0.42, 0.0, 1.00, 1.0],
  'easeOut': [0.00, 0.0, 0.58, 1.0],
  'easeInOut': [0.42, 0.0, 0.58, 1.0],
    // Cubic
  'easeInCubic': [0.550, 0.055, 0.675, 0.190],
  'easeOutCubic': [0.215, 0.610, 0.355, 1.000],
  'easeInOutCubic': [0.645, 0.045, 0.355, 1.000],
    // Circ
  'easeInCirc': [0.600, 0.040, 0.980, 0.335],
  'easeOutCirc': [0.075, 0.820, 0.165, 1.000],
  'easeInOutCirc': [0.785, 0.135, 0.150, 0.860],
    // Expo
  'easeInExpo': [0.950, 0.050, 0.795, 0.035],
  'easeOutExpo': [0.190, 1.000, 0.220, 1.000],
  'easeInOutExpo': [1.000, 0.000, 0.000, 1.000],
    // Quad
  'easeInQuad': [0.550, 0.085, 0.680, 0.530],
  'easeOutQuad': [0.250, 0.460, 0.450, 0.940],
  'easeInOutQuad': [0.455, 0.030, 0.515, 0.955],
    // Quart
  'easeInQuart': [0.895, 0.030, 0.685, 0.220],
  'easeOutQuart': [0.165, 0.840, 0.440, 1.000],
  'easeInOutQuart': [0.770, 0.000, 0.175, 1.000],
    // Quint
  'easeInQuint': [0.755, 0.050, 0.855, 0.060],
  'easeOutQuint': [0.230, 1.000, 0.320, 1.000],
  'easeInOutQuint': [0.860, 0.000, 0.070, 1.000],
    // Sine
  'easeInSine': [0.470, 0.000, 0.745, 0.715],
  'easeOutSine': [0.390, 0.575, 0.565, 1.000],
  'easeInOutSine': [0.445, 0.050, 0.550, 0.950],
    // Back
  'easeInBack': [0.600, -0.280, 0.735, 0.045],
  'easeOutBack': [0.175, 0.885, 0.320, 1.275],
  'easeInOutBack': [0.680, -0.550, 0.265, 1.550]
}

module.exports = function (method) {
  var easingMethod
  if (typeof method === 'string') {
    easingMethod = ease[method]
    if (easingMethod && Array.isArray(easingMethod)) {
      return new (Function.prototype.bind.apply(KeySpline, [null].concat(easingMethod)))()
    }
  } else {
    return new (Function.prototype.bind.apply(KeySpline, [null].concat([].slice.call(arguments))))()
  }
}
