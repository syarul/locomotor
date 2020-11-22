import { useState, useEffect } from 'locomotor'

let i = 0

function Duo (props) {
  const { todo } = props
  const [foo, setFoo] = useState(0)
  const [bar, setBar] = useState('bb')

  i++
  console.log(`${todo} ${i} times!`)

  const clickFoo = e => {
    setFoo(foo === 1 ? 0 : 1)
  }

  const clickBar = e => {
    setBar(bar === 'bb' ? 'rr' : 'bb')
  }

  useEffect(() => {
    console.log('foo called !!!')
    return () => {
      console.log('out foo')
    }
  }, [foo])

  useEffect(() => {
    console.log('bar called !!!')
    return () => {
      console.log('out bar')
    }
  }, [bar])

  return (
    <div>
      <button onClick={clickFoo}>
        {todo}: {foo}
      </button>
      <button onClick={clickBar}>
        {todo}: {bar}
      </button>
    </div>
  )
}

export default Duo
