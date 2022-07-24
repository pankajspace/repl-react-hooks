import React, { useState, useReducer } from "react";

// https://www.youtube.com/watch?v=NnwkRvElx9E&t=0s

const reducer1 = (state, action) => {
  switch (action.type) {
    case "inc": return state + 1;
    case "dec": return state - 1;
    default: return state;
  }
}
export const UseReducerApp1 = () => {
  const [count, dispatch] = useReducer(reducer1, 0);
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => dispatch({ type: "inc" })}>increment</button>
      <button onClick={() => dispatch({ type: "dec" })}>decrement</button>
    </div>
  )
}


const reducer2 = (state, action) => {
  console.log("state, action", state, action)
  switch (action.type) {
    case "addTodo": return {
      todos: [...state.todos, { title: action.payload, completed: false }],
      todosCount: state.todosCount + 1
    };
    case "toggleTodo":
      return {
        todos: state.todos.map((todo, id) =>
          id == action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
        todosCount: state.todosCount
      };
    default: return state;
  }
}
export const UseReducerApp2 = () => {
  const [{ todos, todosCount }, dispatch] = useReducer(reducer2, { todos: [], todosCount: 0 });
  const [val, setVal] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "addTodo", payload: val });
          setVal("");
        }}
      >
        <input type="text" value={val} onChange={e => setVal(e.target.value)} />
      </form>
      <div>Number of todos: {todosCount}</div>
      <div>
        {todos.map((todo, id) =>
          <div
            key={todo.title}
            onClick={() => dispatch({ type: "toggleTodo", payload: id })}
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
          >
            {todo.title}
          </div>
        )}
      </div>
    </div >
  )
}