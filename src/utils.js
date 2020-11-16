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

export const uuid = () => {
  let u = ''
  const m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  let i = 0
  let rb = Math.random() * 0xffffffff | 0
  while (i++ < 36) {
    const c = m[i - 1]
    const r = rb & 0xf
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    u += (c === '-' || c === '4') ? c : v.toString(16)
    rb = i % 8 === 0 ? Math.random() * 0xffffffff | 0 : rb >> 4
  }
  return u
}
