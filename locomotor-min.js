!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.locomotor=t():e.locomotor=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=window.___hookusPocusRunMap||new(WeakMap||Map);window.___hookusPocusRunMap=r;const o=r.h||[];r.h=o;const u=r.d||new(WeakMap||Map);r.d=u;const i=e=>(function t(){const n=o[r.stackIndex][0];r.hookIndex++;const i=o[r.stackIndex][r.hookIndex]||(o[r.stackIndex][r.hookIndex]=[{context:n,hook:e}]);return(u.get(t)||e).apply({},i.concat(Array.from(arguments)))}),a=(e,t)=>{const n=(o[r.stackIndex]||[]).map(e=>{if(e[0]&&e[0][t]){const n=e[0][t]();return e[0][t]=0,n}}).filter(e=>e instanceof Promise);if(n.length>0){const t=Promise.all(n);r.set(e,r.has(e)?r.get(e).then(t):t)}},c=(e,t)=>{if(r.has(e)){const n=r.get(e).then(t);return r.set(e,n),n}return t()},f=(e,t,n,i)=>{if(!0!==t)return c(e,()=>(r.hookIndex=0,r.stackIndex=o.push(u.get(e)||[e])-1,u.set(e,o[r.stackIndex]),a(e,"before"),c(e,()=>{let t=n.apply(n,i);return a(e,"after"),c(e,()=>(o.pop(),r.delete(e),t))})));r.set(e,a(e,"cleanUp")),u.delete(e)},s=function(){const e=Array.from(arguments);let t;return e[0].pop&&(t=e.shift()),f("boolean"==typeof e[1]?e[0]:e[1]||e[0],!0===e[1]||e[2],e[0],t)},l=i((e,t,n,r)=>(e.s=void 0!==e.s?e.s:r?r(n):n,[e.s,n=>(e.s=t(e.s,n),e.s)])),p=e=>{const[t,n]=l((e,t)=>t.value,e);return[t,e=>n({value:e})]},d=i((e,t,n)=>{e.v&&(!n||n.length===e.v.length&&n.every(t=>~e.v.indexOf(t)))||(e.v=n,e.cleanUp&&e.cleanUp(),e.after=(()=>{let n=t();return n instanceof Promise?n=n.then(t=>e.cleanUp=t):e.cleanUp=n,n}))}),y=(e,t)=>{d(()=>new Promise(t=>requestAnimationFrame(()=>t(e()))),t)};var m,b;function h(e,t){if(e.nodeType===t.nodeType)if(1===e.nodeType){if(function(e,t){return function(e,t){"INPUT"===e.nodeName&&(e.checked!==t.checked&&(e.checked=t.checked),e.value!==t.value&&(e.value=t.value))}(e,t)||e.isEqualNode(t)}(e,t))return;e.nodeName===t.nodeName?e.hasAttribute("key")&&t.hasAttribute("key")||w.has(t)?(w.has(t)&&w.delete(t),e.parentNode.replaceChild(t,e)):(function(e,t){for(var n=t.attributes,r={},o=0;o<n.length;)r[n[o].name]=n[o].value,o++;for(var u=e.attributes,i={},a=0;a<u.length;)i[u[a].name]=u[a].value,a++;for(var c in r)e.attributes[c]&&e.attributes[c].name===c&&e.attributes[c].value!==r[c]?e.setAttribute(c,r[c]):e.hasAttribute(c)||e.setAttribute(c,r[c]);for(var f in i)t.attributes[f]&&e.attributes[f]||e.removeAttribute(f)}(e,t),k(e.firstChild,t.firstChild,e)):k(e.firstChild,t.firstChild,e)}else e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue);else k(e.firstChild,t.firstChild,e)}function v(e,t){return e.length-t-1}function g(e,t,n){for(var r;e>0;)r=v(n,--e),t.appendChild(n[r])}function k(e,t,n){for(var r,o=0,u=[];t;)o++,m=t,t=t.nextSibling,u.push(m);if(e)for(;e;)b=e,e=e.nextSibling,r=v(u,--o),b&&u[r]?h(b,u[r]):b&&!u[r]&&n.removeChild(b),null===e&&g(o,n,u);else g(o,n,u)}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var w=new(WeakMap||Map);function j(e,t){if(t=t||document.createDocumentFragment(),null===e)return t;var n=e.elementName,r=e.attributes,o=e.children,u=null;return"object"===O(e)?Array.isArray(e)?Array.from(e,function(e){return j(e,t)}):"Locomotor.Fragment"===n?Array.from(o,function(e){return j(e,t)}):n.match(/Locomotor.Provider./)?Array.from(o,function(e){j(e,t)}):(u=document.createElement(n),Array.from(Object.keys(r),function(e){return function(e,t,n){return"function"==typeof n&&t.match(/^on/)?function(e,t,n){e.addEventListener(t.replace(/^on/,"").toLowerCase(),n,!1),w.set(e,!0)}.apply(null,arguments):"className"===t||"class"===t?function(e,t,n){"object"===O(n)?e.setAttribute("class",Object.keys(n).filter(function(e){return n[e]}).map(function(e){return e}).join(" ")):e.setAttribute("class",n)}.apply(null,arguments):"style"===t&&"object"===O(n)?e.setAttribute(t,function(e){var t,n,r="";for(var o in e)r+=(n=e,"".concat((t=o).replace(/([A-Z]+)/g,"-$1").toLowerCase(),":").concat(n[t],";"));return r}(n)):"boolean"==typeof n?n&&e.setAttribute(t,""):e.setAttribute(t,n)}(u,e,r[e])})):u=document.createTextNode(e),o&&o.length&&Array.from(o,function(e){return j(e,u)}),u&&t.appendChild(u),t}function x(e,t,n,r){return e instanceof Promise?e.then(function(e){return r(t,n(e))}):r(t,n(e)),t}var P=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,(n=[{key:"render",value:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];this.r=x.apply(void 0,n.concat([j,function(t,n){t.appendChild(n),e.emit("init")}]))}},{key:"deffer",value:function(){var e=this;return new Promise(function(t){return t(e.r)})}},{key:"emit",value:function(){this.deffer().then(U)}},{key:"on",value:function(e){var t=this;x(e,this.r,j,function(e,n){(function(e,t){k(e.firstChild,t.firstChild,t)})(e,n),t.emit("update")})}}])&&A(t.prototype,n),e}());const M=(e,t)=>{u.set(e,t)};function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach(function(t){I(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,o=!1,u=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,u=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw u}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var L=new(WeakMap||Map);L.stack=new(WeakMap||Map),L.base=[],L.fn=new(WeakMap||Map),L.ef=new(WeakMap||Map);var E=new(WeakMap||Map);E.h=[],E.u=[],E.d=new(WeakMap||Map);var T,W=function(e,t){return JSON.stringify(e)===JSON.stringify(t)},D=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return P.on(e)}(function e(t,n,r){if(t.context===n){for(var o in t)t[o]=r[o];t.context=n}else Array.isArray(t)?Array.from(t,function(t){return e(t,n,r)}):t.children&&t.children.length&&Array.from(t.children,function(t){return e(t,n,r)});return t}.apply(null,t))};T=function(e){var t=_(L.base,1)[0],n=_(L.get(t),1)[0],r=L.fn.get(e);L.fn.set(e,N({},r,{s:!1}));var o=s([r.p],e),u=L.fn.get(n);u.n instanceof Promise?u.n.then(function(t){return D(t,e,o)}):D(u.n,e,o)},M(l,(e,t,n,r)=>{const[o,u]=e.hook(e,t,n,r);return[o,t=>{const n=u(t);return o!==n&&T(e.context),n}]}),M(d,function(e,t,n){var r=_(u.get(e.context),1)[0],o=L.ef.get(r);L.ef.set(r,n);var i=L.fn.get(r);i&&(i&&!(i.e||[]).length||!W(o,n))&&(Array.from(i.e||[],function(e){return e()}),t().then(function(e){e&&"function"==typeof e&&function(e,t){var n=L.fn.get(t)||{},r=(n||{}).e;L.fn.set(t,N({},n,{e:(void 0===r?[]:r).concat(e)}))}(e,r)}))});var U=function(){Array.from(L.base,function(e){return L.stack.set(e,0)}),E.s=0,Array.from(E.u,function(e){return e()}),E.u=[]},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=E.s||0;E.s=t+1;var n={Provider:"Locomotor.Provider.".concat(t)};return E.set(n,e),E.h.push(n),n},V=i(function(e,t){e.s=void 0!==e.s?e.s:E.get(t)||{};var n=_(l(function(t,n){return e.s=n,e.s},e.s),2),r=n[0],o=n[1];return E.d.set(t,function(e){return o(e)}),r}),R=function(e,t){e.context=t,e.elementName.match(/Locomotor.Provider./)&&function(e,t){var n=N({},E.get(E.h[e])||{});for(var r in t)"object"===S(t[r])?n=N({},n,{},t[r]):n[r]=t[r];var o=E.d.get(E.h[e]);E.u.push(o.bind(null,n))}(_(e.elementName.match(/([^Locomotor.Provider.])(.*)/g),1)[0],e.attributes)},q=function e(t){var n=t.children;return"function"==typeof t.elementName?function(e){var t,n,r,o,u=e.attributes,i=(n=L.stack.get(t=e.elementName)||0,o=(r=L.get(t)||[])[n]||t.bind({}),r[n]=o,L.set(t,r),L.stack.set(t,n+1),!~L.base.indexOf(t)&&L.base.push(t),o),a=null,c=L.fn.get(i)||{},f=c.n;return(a=c.s&&W(c.p,u)?f:s([u],i))instanceof Promise?a.then(function(e){return R(e,i)}):R(a,i),L.fn.set(i,{s:!0,n:a,p:u}),a}(t):n&&n.length?N({},t,{children:Array.from(n,e)}):t},J=function(e,t){if("function"!=typeof e)return q(e);for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return q({elementName:e,attributes:t||{},children:r||[]})};n.d(t,"L",function(){return Z}),n.d(t,"default",function(){return J}),n.d(t,"locoDOM",function(){return P}),n.d(t,"useReducer",function(){return l}),n.d(t,"useState",function(){return p}),n.d(t,"useEffect",function(){return y}),n.d(t,"useLayoutEffect",function(){return d}),n.d(t,"createContext",function(){return F}),n.d(t,"useContext",function(){return V});var Z="Locomotor.Fragment"}])});