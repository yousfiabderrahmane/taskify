import React from "react";
import { Todo } from "./model";

interface Props {
  todo: Todo;
  todos: Todo[];
}

export const SingleTodo: React.FC<Props> = ({ todo }) => {
  return <div>SingleTodo</div>;
};
