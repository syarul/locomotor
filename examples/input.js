import { useState } from 'locomotor'

let i = 0

function App (props) {
  const { todo } = props
  const [state, setState] = useState(false)

  i++
  console.log(`${todo} ${i} times!`)

  const clickRadio = ({ target }) => {
    console.log(target.checked)
    setState(!state)
  }

  const [input, setInput] = useState('')

  const change = e => {
    console.log(e.target.value)
    setInput(e.target.value)
  }

  return (
    <div>
      <input onclick={clickRadio} type='checkbox' checked={state} />
      {JSON.stringify(state)}

      <input onChange={change} type='text' value={input} />
      {JSON.stringify(input)}
    </div>
  )
}

export default App
