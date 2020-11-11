export const loop = (arr, fn) => {
  let a = []
  for (let i = 0, l = arr.length; i < l; i++) {
    a.push(fn(arr[i]))
  }
  return a
}

export const uniqueReverse = l => {
  let a = []
  for (let i = l.length - 1; i >= 0; i--) {
    if (a.indexOf(l[i]) === -1) { a.push(l[i]) }
  }
  return a
}

export const filter = (arr, cond) => {
  let match = []
  for (let i = 0; i < arr.length; i++) {
    if (cond(arr[i])) match.push(arr[i])
  }
  return match
}