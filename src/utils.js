export const loop = (arr, fn) => {
  if(!arr) return 
  const a = []
  for (let i = 0, l = arr.length; i < l; i++) {
    a.push(fn(arr[i]))
  }
  return a
}

export const uniqueReverse = l => {
  const a = []
  for (let i = l.length - 1; i >= 0; i--) {
    if (a.indexOf(l[i]) === -1) { a.push(l[i]) }
  }
  return a
}

export const filter = (arr, cond) => {
  const match = []
  for (let i = 0; i < arr.length; i++) {
    if (cond(arr[i])) match.push(arr[i])
  }
  return match
}

export const isEqual = function (x, y) {
  if (x === y) return true
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!Object.prototype.hasOwnProperty.call(x, p)) continue
    // other properties were tested using x.constructor === y.constructor

    if (!Object.prototype.hasOwnProperty.call(y, p)) return false
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue
    // if they have the same strict value or identity then they are equal

    if (typeof (x[p]) !== 'object') return false
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!isEqual(x[p], y[p])) return false
    // Objects and Arrays must be tested recursively
  }

  for (p in y) {
    if (Object.prototype.hasOwnProperty.call(y, p) && !Object.prototype.hasOwnProperty.call(y, p)) return false
    // allows x[ p ] to be set to undefined
  }
  return true
}
