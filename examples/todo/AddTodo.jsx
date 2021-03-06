import { useState } from 'locomotor'
let i = 0
function AddTodo({add}) {
  const [text, setText] = useState('')
  const onChange = e => {
    setText(e.target.value)
  }

  const onClick = () => {  
    add(text)
    setText('')
  }

  return (
    <div>
      <input value={text} onChange={onChange} autofocus=''/>
      <button onClick={onClick}>Add {text}</button>
    </div>
  )
}

export default AddTodo
