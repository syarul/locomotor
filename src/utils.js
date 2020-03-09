Array.prototype.loop = function (fn) {
    const a = []
    for (let i = 0, l = this.length; i < l; i++)
        a.push(fn(this[i]))
    return a
}

Array.prototype.uniqueReverse = function () {
    const a = []
    for (let i = this.length - 1; i >= 0; i--)
        if (a.indexOf(this[i]) === -1)
            a.push(this[i])
    return a
}