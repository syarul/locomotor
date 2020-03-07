import { L as Fragment, useState} from 'locomotor'

const Todo = ({ todo, remove }) => {
  const [text] = useState(todo.text)
  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={remove}>Remove</button>
      <span>{text}</span>
    </div>
  )
}

export default Todo
