import { L as Fragment, useState } from 'locomotor'

function List (props) {
  const { foobar, todo } = props

  console.log(`child ${foobar} is rendered`)

  const [count, setCount] = useState(0)

  const click = e => {
    setCount(count + 1)
  }

  return (
    <li>
      <button onClick={click}>count : {count} || prop: {foobar} || {todo} </button>
    </li>
  )
}

// this the root App it will get rendered regardless of
// children status
function App (props) {
  const ls = []

  for (let i = 0; i < 5; i++) {
    ls.push({
      foobar: 'foo' + i
    })
  }

  const ListEl = listProp => (<List {...listProp} {...props} />)

  return (
    <Fragment>
      <List foobar='solo' {...props} />
      <ul>
        {ls.map(ListEl)}
      </ul>
    </Fragment>
  )
}

export default App
