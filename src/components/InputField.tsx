import React from "react";
import "./styles.css";

export const InputField = () => {
  return (
    <form className="input">
      <input type="input" placeholder="Enter a task" className="input__box" />
      <button className="input_submit" type="submit">
        Add
      </button>
    </form>
  );
};
