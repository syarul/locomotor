export const initialState = {
  counter: 2,
  todos: [{
    id: 'id1',
    text: 'One'
  }, {
    id: 'id2',
    text: 'Two'
  }]
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
    {
      const newCounter = state.counter + 1
      const newTodo = {
        id: `id${Math.random()}`,
        text: action.text
      }
      return {
        counter: newCounter,
        todos: [...state.todos, newTodo]
      }
    }
    case 'edit':
    {
      const idx = state.todos.findIndex(t => t.id === action.id)
      const todo = Object.assign({}, state.todos[idx])
      todo.text = action.text
      const todos = Object.assign([], state.todos)
      todos.splice(idx, 1, todo)
      return {
        counter: state.counter,
        todos: todos
      }
    }
    case 'remove':
    {
      const idx = state.todos.findIndex(t => t.id === action.id)
      const todos = Object.assign([], state.todos)
      todos.splice(idx, 1)
      return {
        counter: state.counter - 1,
        todos: todos
      }
    }
    default:
      return state
  }
}
