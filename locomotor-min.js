!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.locomotor=e():t.locomotor=e()}(window,function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}([function(t){var e=Array.prototype.slice;function r(t){var r=this,i=e.call(arguments,1);return new Promise(function(e,a){if("function"==typeof t&&(t=t.apply(r,i)),!t||"function"!=typeof t.next)return e(t);function u(e){var r;try{r=t.next(e)}catch(t){return a(t)}f(r)}function c(e){var r;try{r=t.throw(e)}catch(t){return a(t)}f(r)}function f(t){if(t.done)return e(t.value);var i=n.call(r,t.value);return i&&o(i)?i.then(u,c):c(new TypeError('You may only yield a function, promise, generator, array, or object, but the following object was passed: "'+t.value+'"'))}u()})}function n(t){return t?o(t)?t:function(t){var e=t.constructor;return!!e&&("GeneratorFunction"===e.name||"GeneratorFunction"===e.displayName||i(e.prototype))}(t)||i(t)?r.call(this,t):"function"==typeof t?function(t){var r=this;return new Promise(function(n,o){t.call(r,function(t,r){if(t)return o(t);arguments.length>2&&(r=e.call(arguments,1)),n(r)})})}.call(this,t):Array.isArray(t)?function(t){return Promise.all(t.map(n,this))}.call(this,t):Object==t.constructor?function(t){for(var e=new t.constructor,r=Object.keys(t),i=[],a=0;a<r.length;a++){var u=r[a],c=n.call(this,t[u]);c&&o(c)?f(c,u):e[u]=t[u]}return Promise.all(i).then(function(){return e});function f(t,r){e[r]=void 0,i.push(t.then(function(t){e[r]=t}))}}.call(this,t):t:t}function o(t){return"function"==typeof t.then}function i(t){return"function"==typeof t.next&&"function"==typeof t.throw}t.exports=r.default=r.co=r,r.wrap=function(t){return e.__generatorFunction__=t,e;function e(){return r.call(this,t.apply(this,arguments))}}},function(t){var e=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function u(t,e,r,n){var o=Object.create((e&&e.prototype instanceof s?e:s).prototype),i=new j(n||[]);return o._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=g(a,r);if(u){if(u===f)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=c(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,i),o}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function s(){}function l(){}function p(){}var h={};h[o]=function(){return this};var y=Object.getPrototypeOf,d=y&&y(y(x([])));d&&d!==e&&r.call(d,o)&&(h=d);var v=p.prototype=s.prototype=Object.create(h);function m(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function b(t){var e;this._invoke=function(n,o){function i(){return new Promise(function(e,i){!function e(n,o,i,a){var u=c(t[n],t,o);if("throw"!==u.type){var f=u.arg,s=f.value;return s&&"object"==typeof s&&r.call(s,"__await")?Promise.resolve(s.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(s).then(function(t){f.value=t,i(f)},function(t){return e("throw",t,i,a)})}a(u.arg)}(n,o,e,i)})}return e=e?e.then(i,i):i()}}function g(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,g(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=c(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function x(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:void 0,done:!0}}return l.prototype=v.constructor=p,p.constructor=l,p[a]=l.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===l||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},m(b.prototype),b.prototype[i]=function(){return this},t.AsyncIterator=b,t.async=function(e,r,n,o){var i=new b(u(e,r,n,o));return t.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},m(v),v[a]="Generator",v[o]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=x,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:x(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}},function(t,e,r){"use strict";r.r(e);const n=window.___hookusPocusRunMap||new(WeakMap||Map);window.___hookusPocusRunMap=n;const o=n.h||[];n.h=o;const i=n.d||new(WeakMap||Map);n.d=i;const a=t=>(function e(){const r=o[n.stackIndex][0];n.hookIndex++;const a=o[n.stackIndex][n.hookIndex]||(o[n.stackIndex][n.hookIndex]=[{context:r,hook:t}]);return(i.get(e)||t).apply({},a.concat(Array.from(arguments)))}),u=(t,e)=>{const r=(o[n.stackIndex]||[]).map(t=>{if(t[0]&&t[0][e]){const r=t[0][e]();return t[0][e]=0,r}}).filter(t=>t instanceof Promise);if(r.length>0){const e=Promise.all(r);n.set(t,n.has(t)?n.get(t).then(e):e)}},c=(t,e)=>{if(n.has(t)){const r=n.get(t).then(e);return n.set(t,r),r}return e()},f=(t,e,r,a)=>{if(!0!==e)return c(t,()=>(n.hookIndex=0,n.stackIndex=o.push(i.get(t)||[t])-1,i.set(t,o[n.stackIndex]),u(t,"before"),c(t,()=>{let e=r.apply(r,a);return u(t,"after"),c(t,()=>(o.pop(),n.delete(t),e))})));n.set(t,u(t,"cleanUp")),i.delete(t)},s=function(){const t=Array.from(arguments);let e;return t[0].pop&&(e=t.shift()),f("boolean"==typeof t[1]?t[0]:t[1]||t[0],!0===t[1]||t[2],t[0],e)},l=a((t,e,r,n)=>(t.s=void 0!==t.s?t.s:n?n(r):r,[t.s,r=>(t.s=e(t.s,r),t.s)])),p=t=>{const[e,r]=l((t,e)=>e.value,t);return[e,t=>r({value:t})]},h=a((t,e,r)=>{t.v&&(!r||r.length===t.v.length&&r.every(e=>~t.v.indexOf(e)))||(t.v=r,t.cleanUp&&t.cleanUp(),t.after=(()=>{let r=e();return r instanceof Promise?r=r.then(e=>t.cleanUp=e):t.cleanUp=r,r}))}),y=(t,e)=>{h(()=>new Promise(e=>requestAnimationFrame(()=>e(t()))),e)};function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return r}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach(function(e){g(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function g(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var w=new(WeakMap||Map);w.h=[],w.c=[],w.d=new(WeakMap||Map),w.u=[];var O,j,x=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=w.s||0;w.s=e+1;var r={Provider:"Locomotor.Provider.".concat(e)};return w.set(r,t),w.h.push(r),r},P=a(function(t,e){t.s=void 0!==t.s?t.s:w.get(e)||{};var r=d(l(function(e,r){return t.s=r,t.s},t.s),2),n=r[0],o=r[1];return w.d.set(e,function(t){return o(t)}),n}),k=function(t,e){t.context=e,t.elementName.match(/Locomotor.Provider./)&&function(t,e){var r=b({},w.get(w.h[t])||{});for(var n in e)"object"===v(e[n])?r=b({},r,{},e[n]):r[n]=e[n];var o=w.d.get(w.h[t]);w.c.push(o.bind(null,r))}(d(t.elementName.match(/([^Locomotor.Provider.])(.*)/g),1)[0],t.attributes)},A=(r(1),r(0)),L=r.n(A);function S(t,e){if(t.nodeType===e.nodeType)if(1===t.nodeType){if(function(t,e){return function(t,e){"INPUT"===t.nodeName&&(t.checked!==e.checked&&(t.checked=e.checked),t.value!==e.value&&(t.value=e.value))}(t,e)||t.isEqualNode(e)}(t,e))return;if(t.nodeName===e.nodeName){if(t.hasAttribute("key")&&e.hasAttribute("key")||J.has(e)?(J.has(e)&&J.delete(e),t.parentNode.replaceChild(e,t)):(function(t,e){for(var r=e.attributes,n={},o=0;o<r.length;)n[r[o].name]=r[o].value,o++;for(var i=t.attributes,a={},u=0;u<i.length;)a[i[u].name]=i[u].value,u++;for(var c in n)t.attributes[c]&&t.attributes[c].name===c&&t.attributes[c].value!==n[c]?t.setAttribute(c,n[c]):t.hasAttribute(c)||t.setAttribute(c,n[c]);for(var f in a)e.attributes[f]&&t.attributes[f]||t.removeAttribute(f)}(t,e),N(t.firstChild,e.firstChild,t)),J.i.has(t)){J.i.delete(t),e.focus();var r=e.value;e.value="",e.value=r}}else N(t.firstChild,e.firstChild,t)}else t.nodeValue!==e.nodeValue&&(t.nodeValue=e.nodeValue);else N(t.firstChild,e.firstChild,t)}function E(t,e){return t.length-e-1}function _(t,e,r){for(var n;t>0;)n=E(r,--t),e.appendChild(r[n])}function N(t,e,r){for(var n,o=0,i=[];e;)o++,O=e,e=e.nextSibling,i.push(O);if(t)for(;t;)j=t,t=t.nextSibling,n=E(i,--o),j&&i[n]?S(j,i[n]):j&&!i[n]&&r.removeChild(j),null===t&&_(o,r,i);else _(o,r,i)}function M(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function C(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?M(Object(r),!0).forEach(function(e){I(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function I(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function T(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return r}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var D=new(WeakMap||Map);D.stack=new(WeakMap||Map),D.base=[],D.fn=new(WeakMap||Map);var F,G=function(t){return t()};F=function(t){var e,r=T(D.base,1)[0],n=T(D.get(r),1)[0],o=D.fn.get(t);D.fn.set(t,C({},o,{s:!1})),e=s([o.p],t),D.fn.set(t,C({},o,{n:e}));var i=[],a=[];if(e instanceof Promise&&(i.push(e),a.push(function(t){e=t})),t===n)return B(e);var u=D.fn.get(n);u.n instanceof Promise&&(i.push(u.n),a.push(function(t){u.n=t}));var c=function(){k(e,t),function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];B(function t(e,r,n){var o=function(e){return t(e,r,n)};if(e instanceof Promise&&e.then(o),e.context===r){for(var i in e)e[i]=n[i];e.context=r}else Array.isArray(e)?Array.from(e,o):e.children&&e.children.length&&Array.from(e.children,o);return e}.apply(null,e))}(u.n,t,e)};i.length?Promise.all(i).then(function(t){return t.map(function(t,e){return a[e](t)})}).then(c):c()},i.set(l,(t,e,r,n)=>{const[o,i]=t.hook(t,e,r,n);return[o,e=>{const r=i(e);return o!==r&&F(t.context),r}]});var W=function t(e){if(e instanceof Promise)return e.then(t);var r=e.children;return"function"==typeof e.elementName?function(t){var e,r,n,o,i=t.attributes,a=(r=D.stack.get(e=t.elementName)||0,o=(n=D.get(e)||[])[r]||e.bind({}),n[r]=o,D.set(e,n),D.stack.set(e,r+1),!~D.base.indexOf(e)&&D.base.push(e),o),u=null,c=D.fn.get(a)||{},f=c.n,l=c.p,p=function(t){return k(t,a)};return(u=c.s&&function(t,e){return JSON.stringify(l)===JSON.stringify(e)}(0,i)?f:s([i],a))instanceof Promise?u.then(p):p(u),D.fn.set(a,{s:!0,n:u,p:i}),u}(e):r&&r.length?C({},e,{children:Array.from(r,t)}):e};function R(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function U(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function V(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?U(Object(r),!0).forEach(function(e){Y(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function Y(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function q(t){return(q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var J=new(WeakMap||Map);J.i=new(WeakMap||Map);var Z=function t(e,r,n){if(r=r||document.createDocumentFragment(),null===e)return r;var o=e.elementName,i=e.attributes,a=e.children;void 0!==n&&(i.key=n);var u=null;return"object"===q(e)?Array.isArray(e)?Array.from(e,function(e,n){return t(e,r,n)}):"Locomotor.Fragment"===o?Array.from(a,function(e){return t(e,r)}):o.match(/Locomotor.Provider./)?Array.from(a,function(e){return t(e,r)}):("INPUT"===(u=document.createElement(o)).nodeName&&u.addEventListener("focus",function(){return J.i.set(u,!0)},!1),Array.from(Object.keys(i),function(t){return function(t,e,r){return"function"==typeof r&&e.match(/^on/)?function(t,e,r){e="change"===(e=e.replace(/^on/,"").toLowerCase())?"keyup":e,t.addEventListener(e.replace(/^on/,"").toLowerCase(),r,!1),J.set(t,!0)}.apply(null,arguments):"className"===e||"class"===e?function(t,e,r){"object"===q(r)?t.setAttribute("class",Object.keys(r).filter(function(t){return r[t]}).map(function(t){return t}).join(" ")):t.setAttribute("class",r)}.apply(null,arguments):"style"===e&&"object"===q(r)?t.setAttribute(e,function(t){var e,r,n="";for(var o in t)n+=(r=t,"".concat((e=o).replace(/([A-Z]+)/g,"-$1").toLowerCase(),":").concat(r[e],";"));return n}(r)):"boolean"==typeof r?r&&t.setAttribute(e,""):t.setAttribute(e,r)}(u,t,i[t])})):u=document.createTextNode(e),a&&a.length&&Array.from(a,function(e){return t(e,u)}),u&&r.appendChild(u),r},$=function t(e){return L.a.wrap(regeneratorRuntime.mark(function r(){var n,o,i;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!(e instanceof Promise)){r.next=9;break}return r.next=3,Promise.resolve(e);case 3:return e=r.sent,r.next=6,t(e);case 6:return r.abrupt("return",r.sent);case 9:if(!Array.isArray(e)){r.next=15;break}return r.next=12,Array.from(e,t);case 12:return r.abrupt("return",r.sent);case 15:if("object"===q(e)){r.next=19;break}return r.abrupt("return",e);case 19:if(o=(n=e).elementName,i=n.children,!(o instanceof Promise)){r.next=24;break}return r.next=23,Promise.resolve(o);case 23:o=r.sent;case 24:return r.next=26,Array.from(i||[],t);case 26:return r.abrupt("return",V({},e,{elementName:o,children:i=r.sent}));case 28:case"end":return r.stop()}},r)}))(!0)},z=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,r;return e=t,(r=[{key:"render",value:function(t,e){var r=this;$(t).then(function(t){r.r=e;var n=Z(t);e.appendChild(n),r.emit("init")})}},{key:"deffer",value:function(){var t=this;return new Promise(function(e){return e(t.r)})}},{key:"emit",value:function(t){this.deffer().then(function(){return function(t){Array.from(D.base,function(t){return D.stack.set(t,0)}),D.stage=t,w.s=0,Array.from(w.c,G),w.c=[]}(t)})}},{key:"on",value:function(t){var e=this;$(t).then(function(t){var r=Z(t);(function(t,e){N(t.firstChild,e.firstChild,t)})(e.r,r),e.emit("update")})}}])&&R(e.prototype,r),t}()),B=function(t){return z.on(t)},H=function(t,e){if("function"!=typeof t)return W(t);for(var r=arguments.length,n=Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];return W({elementName:t,attributes:e||{},children:n||[]})};r.d(e,"L",function(){return K}),r.d(e,"default",function(){return H}),r.d(e,"locoDOM",function(){return z}),r.d(e,"useReducer",function(){return l}),r.d(e,"useState",function(){return p}),r.d(e,"useEffect",function(){return y}),r.d(e,"useLayoutEffect",function(){return h}),r.d(e,"createContext",function(){return x}),r.d(e,"useContext",function(){return P});var K="Locomotor.Fragment"}])});