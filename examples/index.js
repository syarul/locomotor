import { locoDOM } from 'locomotor'
import TodoApp from './todo/TodoApp'
// import TodoApp from './simple'

const props = {
  add: text => {
    console.log(text)
  },
  todo: 'called'
}

locoDOM.render(
  <TodoApp {...props} />,
  document.getElementById('app')
)
