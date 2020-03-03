import { L as Fragment, useReducer, useEffect } from 'locomotor'
import { initialState, reducer } from './reducers'
import Todo from './Todo.jsx'
import AddTodo from './AddTodo.jsx'

function TodoApp() {

  const cb = (state, action) => {
    const newCounter = state.counter + 1
    const newTodo = {
      id: newCounter,
      text: action.text
    }
    return {
      counter: newCounter,
      todos: [...state.todos, newTodo]
    }
    // return state
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    console.log(state)
  },[state])
  return (
    <Fragment>
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
    </Fragment>)
}
// <AddTodo add={text => dispatch({ type: 'add', text: text })}/>
// {
//   state.todos.map(t => (
//     <Todo
//       key={t.id}
//       todo={t}
//       remove={() => dispatch({ type: 'remove', id: t.id })}
//       edit={text => dispatch({ type: 'edit', id: t.id, text: text })}
//     />))
// }
export default TodoApp
