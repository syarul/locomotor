// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
/** MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
* KeySpline - use bezier curve for transition easing function
* is inspired from Firefox's nsSMILKeySpline.cpp
* Usage:
* var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
* spline.get(x) => returns the easing value | x must be in [0, 1] range
*/
function KeySpline(mX1, mY1, mX2, mY2) {

  this.get = function (aX) {
    if (mX1 == mY1 && mX2 == mY2) return aX; // linear
    return CalcBezier(GetTForX(aX), mY1, mY2);
  };

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  function C(aA1) {
    return 3.0 * aA1;
  }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function CalcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function GetSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function GetTForX(aX) {
    // Newton raphson iteration
    var aGuessT = aX;
    for (var i = 0; i < 4; ++i) {
      var currentSlope = GetSlope(aGuessT, mX1, mX2);
      if (currentSlope == 0.0) return aGuessT;
      var currentX = CalcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
}

module.exports = KeySpline;
},{}],12:[function(require,module,exports) {
/**
 * Utility to apply easing to KeySpline.js by Gaëtan Renaudeau(https://twitter.com/greweb)
*/

var KeySpline = require('./external/KeySpline');

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
  'easeInOutCubic ': [0.645, 0.045, 0.355, 1.000],
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
  'easeInOutQuart ': [0.770, 0.000, 0.175, 1.000],
  // Quint
  'easeInQuint': [0.755, 0.050, 0.855, 0.060],
  'easeOutQuint': [0.230, 1.000, 0.320, 1.000],
  'easeInOutQuint ': [0.860, 0.000, 0.070, 1.000],
  // Sine
  'easeInSine': [0.470, 0.000, 0.745, 0.715],
  'easeOutSine': [0.390, 0.575, 0.565, 1.000],
  'easeInOutSine': [0.445, 0.050, 0.550, 0.950],
  // Back
  'easeInBack': [0.600, -0.280, 0.735, 0.045],
  'easeOutBack': [0.175, 0.885, 0.320, 1.275],
  'easeInOutBack': [0.680, -0.550, 0.265, 1.550]
};

module.exports = function (method) {
  var easingMethod;
  if (typeof method === 'string') {
    easingMethod = ease[method];
    if (easingMethod && Array.isArray(easingMethod)) {
      return new (Function.prototype.bind.apply(KeySpline, [null].concat(easingMethod)))();
    }
  } else {
    return new (Function.prototype.bind.apply(KeySpline, [null].concat([].slice.call(arguments))))();
  }
};
},{"./external/KeySpline":13}],6:[function(require,module,exports) {
'use strict';
/**
 * locomotor v0.0.5 Alpha release: https://github.com/syarul/locomotor
 * A smooth and FPS friendly animation library
 *
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< locomotor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * Copyright 2018, Shahrul Nizam Selamat
 * Released under the MIT License.
 */

var easing = require('./easing');

function locomotor(id, anim, opts) {
  anim = anim || {};

  var animationProperty;
  var functionStr;

  for (var attr in anim) {
    animationProperty = attr;
    if (typeof anim[attr] === 'function') {
      functionStr = anim[attr];
    }
  }

  opts = opts || {};

  this.fps = opts.fps || 60;
  this.fpsInterval = opts.fpsInterval || 1000;
  this.stop = opts.stop || false;
  this.advanceSetup = opts.advanceSetup || null;
  this.easing = opts.easing || null;

  var startTime;
  var then;
  var elapsed;
  var animStep = 0;
  var frameCount = 0;
  var sinceStart = 0;
  var interval = opts.interval || 1; // default value
  var data = opts.data || [0, 100]; // default custom value
  var duration = opts.duration || Infinity;
  var ease;
  var easingStep;
  var step;
  var range;

  var node = document.getElementById(id);

  if (!node) {
    throw new Error('unable to find a DOM node with id: ' + id);
  }

  if (this.easing) {
    ease = easing(this.easing);
  }

  var hasDebugNode = document.getElementById(opts.debugNode);
  var rAF = window.requestAnimationFrame;
  var perf = window.performance;
  var self = this;
  this.startAnimating = function (fps) {
    self.fpsInterval = 1000 / fps;
    then = perf.now();
    startTime = then;
    self.animate(then);
  };

  this.animate = function (now) {
    if (sinceStart > duration) {
      return;
    }
    if (self.stop) {
      return;
    }
    rAF(self.animate);
    elapsed = now - then;
    then = now - elapsed % self.fpsInterval;

    // debug fps
    if (opts.debug) {
      sinceStart = now - startTime;
      var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
      if (hasDebugNode) {
        hasDebugNode.innerHTML = 'Node: ' + id + ' | Elapsed time: ' + Math.round(sinceStart / 1000 * 100) / 100 + ' secs @ ' + currentFps + ' fps.';
      } else {
        console.log('Node: ' + id + ' | Elapsed time: ' + Math.round(sinceStart / 1000 * 100) / 100 + ' secs @ ' + currentFps + ' fps.');
      }
    }
    if (self.advanceSetup && typeof self.advanceSetup === 'function') {
      self.advanceSetup.call(self, node, now, ease);
    } else {
      self.animSet(node, interval, data, animationProperty, functionStr, now);
    }
  };

  this.animSet = function (node, interval, data, animationProperty, functionStr, now) {
    if (typeof functionStr !== 'function') {
      throw new Error('No parameter given to the animation value');
    }
    // get the range of movement
    range = data[1] - data[0];

    if (animStep > data[1]) {
      animStep = data[0];
    }

    if (self.easing) {
      easingStep = ease.get(animStep / range);
      step = range * easingStep;
    }
    if (node) {
      node.style[animationProperty] = functionStr.call(self, self.easing ? step : animStep);
    }
    animStep = animStep + interval;
  };
  this.startAnimating(this.fps);
}

module.exports = locomotor;
},{"./easing":12}],4:[function(require,module,exports) {
'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = document.body.offsetWidth - 100;

new _2.default('square', {
  transform: function transform(step) {
    return 'translate(' + step + 'px, 0) rotate(' + step / 100 + 'rad)';
  }
}, {
  interval: 5,
  data: [0, width],
  easing: 'easeOutCubic',
  debug: true,
  debugNode: 'message'
});

setTimeout(function () {
  // lm.stop = true
}, 5000);

var square2 = document.getElementById('squaretwo');

var c = 0;

var inc = 1.2;

setInterval(function () {
  if (c > width) {
    c = 0;
  }
  square2.style.transform = 'translate(' + c + 'px, 0) rotate(' + c / 100 + 'rad)';
  c = c + inc;
}, 1);
},{"../":6}],8:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59343' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[8,4], null)
//# sourceMappingURL=/sample-transform.2b61e347.map