import React, { useRef } from "react";
import { useTodos } from "../context/Context";
import "./styles.css";
import { ActionType } from "../context/Context";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export const InputField = ({ setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch, todo } = useTodos();
  console.log(todo);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={todo}
        onChange={(e) => {
          dispatch({ type: ActionType.UPDATE_TODO, payload: e.target.value });
        }}
        type="input"
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Add
      </button>
    </form>
  );
};
