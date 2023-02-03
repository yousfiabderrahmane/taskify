import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";
import { ActionType, useTodos } from "../context/Context";

type Props = {
  todo: Todo;
}; //same as interface just wanted to change the flow

export const SingleTodo: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    dispatch,
    handleAdd,
    handleDelete,
    handleDone,
    handleEdit,
    editedTodo,
  } = useTodos();

  const editRef = useRef<HTMLInputElement>(null);

  console.log("bro i re render wtf");

  useEffect(() => {
    editRef.current?.focus();
  }, []);

  return (
    <form
      className="todos__single"
      onSubmit={(e) => {
        handleEdit(e, todo.id);
        setIsEditing(!isEditing);
      }}
    >
      {isEditing ? (
        <input
          ref={editRef}
          value={editedTodo}
          className="todos__single--text"
          onChange={(e) =>
            dispatch({ type: ActionType.EDITED_TODO, payload: e.target.value })
          }
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        {!todo.isDone && (
          <span
            className="icon"
            onClick={() => {
              dispatch({ type: ActionType.EDITED_TODO, payload: todo.todo });
              setIsEditing(!isEditing);
            }}
          >
            <AiFillEdit />
          </span>
        )}
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>

        <span
          className="icon"
          onClick={() => {
            handleDone(todo.id);
          }}
        >
          <MdOutlineDownloadDone />
        </span>
      </div>
    </form>
  );
};
