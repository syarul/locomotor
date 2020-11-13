export const loop = (arr, fn) => {
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
