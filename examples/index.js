import { locoDOM } from 'locomotor'
import AddTodo from './todo/AddTodo.jsx'

const props = { add: text => console.log(text) }

locoDOM.render(
  <AddTodo {...props} />,
  document.getElementById('app')
)
