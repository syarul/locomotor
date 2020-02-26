import { L as Fragment, useState } from 'locomotor'

function List (props) {
  const { foobar, key, todo } = props

  console.log(`child ${key} is rendered`)

  const [count, setCount] = useState(0)

  const click = e => {
    setCount(count + 1)
  }

  return (
    <div key={key}>
      <button onClick={click}>count : {count} || prop: {foobar} || key: {key} || {todo} </button>
    </div>
  )
}

// this the root App it will get rendered regardless of
// children status
function App (props) {
  const ls = []

  for (let i = 0; i < 5; i++) {
    ls.push({
      foobar: 'foo' + i,
      key: i
    })
  }

  const ListEl = listProp => (<List {...listProp} {...props} />)

  return (
    <Fragment>
      {ls.map(ListEl)}
    </Fragment>
  )
}

export default App
