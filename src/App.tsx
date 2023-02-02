import React, { useState } from "react";
import "./App.css";
import { InputField } from "./components/InputField";
import { Todo } from "./components/model";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([
        ...todos,
        {
          id: Math.random() * 70,
          todo: todo,
          isDone: false,
        },
      ]);
      setTodo("");
    }
  };
  console.log(todos);
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* <TodoList todos={}/> */}
      {todos.map((todo) => (
        <h4>{todo.todo}</h4>
      ))}
    </div>
  );
};

export default App;
