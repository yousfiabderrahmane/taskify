import React from "react";
import { Todo } from "./model";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}; //same as interface just wanted to change the flow

export const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  return <div>SingleTodo</div>;
};
