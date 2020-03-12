import { useState, useEffect } from 'locomotor'

let i = 0

function App (props) {
  const { todo } = props
  const [foo, setFoo] = useState(0)

  i++
  console.log(`${todo} ${i} times!`)

  useEffect(() => {
    console.log(foo)
  })

  const clickFoo = e => {
    console.log(foo)
    setFoo(foo === 1 ? 0 : 1)
  }

  return (
    <div>
      <button onClick={clickFoo}>
        {todo}: {foo}
      </button>
    </div>
  )
}

export default App
