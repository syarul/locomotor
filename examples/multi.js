import { useState } from 'locomotor'

function Child1 (props) {
  const { foobar } = props

  console.log('child1 is rendered')

  const [count, setCount] = useState(1)

  const click = e => {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={click}>count : {count}</button>
      <div>Current child1 state is: {foobar}</div>
    </div>
  )
}

// this will not get rendered when child 1 changed,
// if the props changed it will then get rendered
function Child2 (props) {
  const { foobar } = props

  console.log('child2 is rendered')

  return (
    <div>
      <div>Current child2 state is: {foobar}</div>
    </div>
  )
}

// this the root App it will get rendered regardless of
// children status
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
      <Child1 foobar={foobar} />
      <Child2 foobar={foobar} />
    </div>
  )
}

export default App
