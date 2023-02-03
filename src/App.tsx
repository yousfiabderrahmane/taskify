import React, { useState } from "react";
import "./App.css";
import { InputField } from "./components/InputField";
import { Todo } from "./components/model";
import { TodoList } from "./components/TodoList";
import { useToDoContext } from "./context/useToDoContext";

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
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {todos.length > 0 && <TodoList todos={todos} setTodos={setTodos} />}
    </div>
  );
};

export default App;
