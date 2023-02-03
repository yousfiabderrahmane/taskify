import React, { useRef } from "react";
import { useTodos } from "../context/Context";
import "./styles.css";
import { ActionType } from "../context/Context";

export const InputField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch, todo, handleAdd } = useTodos();

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
