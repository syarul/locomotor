import { L, useState } from 'locomotor'

let i = 0

function App (props) {
  const { todo } = props
  const [foo, setFoo] = useState(0)

  i++
  console.log(`${todo} ${i} times!`)

  const clickFoo = () => {
    console.log('click')
    setFoo(foo === 1 ? 0 : 1)
  }

  return (
    <div>
      <button className={{ foo: 'foo', bar: 'bar' }} onclick={clickFoo} style={{ background: 'red' }}>
        click
      </button>
      {foo === 1 ? (<button>foo</button>) : (<L><p>bar</p><button>ber</button></L>)}
    </div>
  )
}

export default App
