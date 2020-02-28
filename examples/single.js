import { useState } from 'locomotor'

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

function Container (props) {
  return (
    <container>
      <App {...props} />
    </container>
  )
}

export default Container
