import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}; //same as interface just wanted to change the flow

export const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo); //initial name

  const editRef = useRef<HTMLInputElement>(null);

  // handle the done proprety function
  const handleDone = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos);
  };

  //delete function
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  //handle edit
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const editedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: editTodo };
      } else {
        return todo;
      }
    });
    setTodos(editedTodos);
    setIsEditing(false);
    if (!editTodo) {
      handleDelete(id);
    }
  };

  useEffect(() => {
    editRef.current?.focus();
  }, [isEditing]);

  return (
    <form
      className="todos__single"
      onSubmit={(e) => {
        handleEdit(e, todo.id);
      }}
    >
      {isEditing ? (
        <input
          ref={editRef}
          value={editTodo}
          className="todos__single--text"
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        {!todo.isDone && !isEditing && (
          <span
            className="icon"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <AiFillEdit />
          </span>
        )}
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        {!isEditing && (
          <span
            className="icon"
            onClick={() => {
              handleDone(todo.id);
            }}
          >
            <MdOutlineDownloadDone />
          </span>
        )}
      </div>
    </form>
  );
};
