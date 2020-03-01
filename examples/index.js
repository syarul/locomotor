import { locoDOM } from 'locomotor'
import TodoApp from './todo/TodoApp.jsx'

const props = { todo: 'called' }

locoDOM.render(
  <TodoApp {...props} />,
  document.getElementById('app')
)
