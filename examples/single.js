import { useState } from '../'

let i = 0

function App (props) {
  const { todo } = props
  const [foobar, setFoobar] = useState('foo')
  i++
  console.log(`${todo} ${i} times! state is ${foobar}`)
  const click = e => {
    setFoobar(foobar === 'foo' ? 'bar' : 'foo')
  }

  return (
    <div>
      <button onClick={click}>
        {todo}: {foobar}
      </button>
    </div>
  )
}

export default App
