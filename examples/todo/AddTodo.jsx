import { useState, useEffect } from 'locomotor'
let i = 0
function AddTodo({add}) {
  const [text, setText] = useState('')
  const onChange = e => {
    // console.log(e)
    setText(e.target.value)
    // i++
  }

  // useEffect(() => {
    // console.log(text)
  // }, [text])

  const onClick = () => {  
    // console.log(i)
    // console.log(text)   
    add(text)
    setText('')
  }

  return (
    <div>
      <input value={text} onChange={onChange} />
      <button onClick={onClick}>Add {text}</button>
    </div>
  )
}

export default AddTodo
