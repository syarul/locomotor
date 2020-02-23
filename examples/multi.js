import { useState } from 'locomotor'

function Child (props) {
  const { foobar } = props

  const [count, setCount] = useState(1)

  const click = e => {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={click}>count : {count}</button>
      <div id='2'>Current state is: {foobar}</div>
    </div>
  )
}

function App (props) {
  const { todo } = props

  const [foobar, setFoobar] = useState(5)

  const click = e => {
    setFoobar(foobar + 1)
  }

  return (
    <div>
      <button onClick={click}>
        {todo}: {foobar}
      </button>
      <p>sub hook</p>
      <Child foobar={foobar} />
    </div>
  )
}

export default App
