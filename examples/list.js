import { L as Fragment, useState, act } from 'locomotor'

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
    <p key={props.key}>
      <button id={foobar} onClick={click}>count : {count} || prop: {foobar} || {todo} </button>
      <button onClick={remove}>X</button>
    </p>
  )
}

// this the root App it will get rendered regardless of
// children status

const _ls = []

// for (let i = 0; i < 5; i++) {
//   _ls.push({
//     key: Math.round(Math.random() * 1e17).toString(32),
//     foobar: 'foo' + i
//   })
// }

function App (props) {
  const [ls, setLs] = useState(_ls)

  const remove = i => {
    const fls = ls.filter(l => l.key !== i)
    // console.log(i, fls)
    setLs([...fls])
  }

  const ListEl = listProp => {
    const { key } = listProp
    return (<List key={key} {...listProp} {...props} remove={remove.bind(null, key)} />)
  }

  const click = () => {
    setLs([...ls, {
      key: (ls.length ? parseInt(ls[ls.length - 1].key) + 1 : 0).toString(),//Math.round(Math.random() * 1e17).toString(32),
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

act(() => {
  // console.log('fo')
})

// setTimeout(() => {
//   setInterval(() => {
//     let i = Math.floor(Math.random() * 5)
//     document.getElementById(`foo${i}`).click()
//   }, 50)
// }, 2000)

export default App
