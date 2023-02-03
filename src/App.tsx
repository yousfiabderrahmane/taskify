import React, { useState } from "react";
import "./App.css";
import { InputField } from "./components/InputField";
import { Todo } from "./components/model";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./context/Context";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { todos: todosList } = useTodos();

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField />
      {todosList.length > 0 && <TodoList />}
    </div>
  );
};

export default App;
