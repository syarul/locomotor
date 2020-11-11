import { L, useReducer } from 'locomotor'
import { initialState, reducer } from './reducers'
import Todo from './Todo.jsx'
import AddTodo from './AddTodo.jsx'

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)
  return (
    <L>
      <AddTodo add={text => dispatch({ type: 'add', text })} />
      {
        state.todos.map(t => (
          <Todo
            key={t.id}
            todo={t}
            remove={() => dispatch({ type: 'remove', id: t.id })}
            edit={text => dispatch({ type: 'edit', id: t.id, text: text })}
          />))
      }
    </L>)
}
export default TodoApp
