import { useContext } from "react";
import { TodoContext } from "./Context";

export const useToDoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    console.log("Used out of scope");
  }

  return context;
};
