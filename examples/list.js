import { L as Fragment, useState } from 'locomotor'

function List (props) {
  const { foobar, todo } = props

  console.log(`child ${foobar} is rendered`)

  const [count, setCount] = useState(0)

  const click = e => {
    setCount(count + 1)
  }

  return (
    <p>
      <button id={foobar} onClick={click}>count : {count} || prop: {foobar} || {todo} </button>
    </p>
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
      {ls.map(ListEl)}
    </Fragment>
  )
}

// setTimeout(() => {
//   setInterval(() => {
//     let i = Math.floor(Math.random() * 5)
//     document.getElementById(`foo${i}`).click()
//   }, 50)
// }, 2000)

export default App
