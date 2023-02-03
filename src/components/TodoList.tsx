import React from "react";
import { useTodos } from "../context/Context";
import { Todo } from "./model";
import { SingleTodo } from "./SingleTodo";

export const TodoList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};
