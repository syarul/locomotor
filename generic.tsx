// type arr = Array<number>

const end = <T extends {}>(arr: Array<T>) => {
    return arr[arr.length - 1]
}

const l = end([1, 2, 3])

const l2 = end(['one', 'two', 'three'])