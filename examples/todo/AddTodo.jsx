import { useState, useEffect } from 'locomotor'

function AddTodo({add}) {
  const [text, setText] = useState('')
  useEffect(() => {
    console.log(text)
  }, [text])
  
  const onChange = e => {
    // console.log(e.target.value)
    setText(e.target.value)
  }

  const onClick = () => {     
    // console.log(text)
    add(text)
    setText('')
  }

  return (
    <div>
      <input value={text} onChange={onChange}/>
      <button onClick={onClick}>Add {text}</button>
    </div>
  )
}

export default AddTodo
