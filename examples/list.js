import { L as Fragment, useState } from 'locomotor'

function List (props) {
  const { foobar, todo, remove } = props

  // console.log(`child ${foobar} is rendered`)

  const [count, setCount] = useState(0)

  const click = e => {
    setCount(count + 1)
  }

  // return (
  //   <button id={foobar} onClick={click}>count : {count} || prop: {foobar} || {todo} </button>

  // )

  return (
    <p>
      <button id={foobar} onClick={click}>count : {count} || prop: {foobar} || {todo} </button>
      <button onClick={remove}>X</button>
    </p>
  )
}

// this the root App it will get rendered regardless of
// children status

function App (props) {
  const [ls, setLs] = useState([])

  const remove = i => {
    const fls = ls.filter(l => l.i !== i)
    console.log(i, fls)
    setLs([...fls])
  }

  const ListEl = listProp => {
    const { i } = listProp
    return (<List key={i} {...listProp} {...props} remove={remove.bind(null, i)} />)
  }

  const click = () => {
    setLs([...ls, {
      i: Math.round(Math.random() * 1e17).toString(32),
      foobar: 'foo' + ls.length
    }])
  }

  return (
    <Fragment>
      <button onClick={click}> add list </button>
      <div>
        {ls.map(ListEl)}
      </div>
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
