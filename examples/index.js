import { locoDOM } from 'locomotor'
import TodoApp from './todo/TodoApp'

const props = { 
  add: text => {
    console.log(text)
  } 
}

locoDOM.render(
  <TodoApp />,
  document.getElementById('app')
)
