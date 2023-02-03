import { useReducer, createContext, useContext } from "react";

// ------------------------
interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

//initial state
const initialState = {
  todo: "",
  todos: [],
  isEditing: false,
  editedTodo: "",
};
// state interface
interface InitialState {
  todo: string; //task
  todos: Todo[]; //lista dyal les task
  isEditing: boolean;
  editedTodo: string;
}

//enum for the action types
export enum ActionType {
  UPDATE_TODO = "UPDATE_TODO", //the task name state
  UPDATE_LIST = "UPDATE_LIST", //the array
  EDIT = "EDIT", //handle the edit
  DONE = "DONE", //handle the done
  DELETE = "DELETE", //handle the delete
  EDITING = "EDITING", //to determine wheter editing ot not
  EDITED_TODO = "EDITED_TODO", //state of the edited todo task name
}
// action interface
type Action =
  | { type: ActionType.UPDATE_TODO; payload: string }
  | { type: ActionType.UPDATE_LIST; payload: Todo[] }
  | { type: ActionType.EDITING; payload: boolean }
  | { type: ActionType.EDITED_TODO; payload: string };

const todoReducer = (state: InitialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.UPDATE_TODO:
      return { ...state, todo: payload };
    case ActionType.UPDATE_LIST:
      return { ...state, todos: payload };
    case ActionType.EDITING:
      return { ...state, isEditing: payload };
    case ActionType.EDITED_TODO:
      return { ...state, editedTodo: payload };
  }
};

//CONTEXT AAAAAAAAAH!!!!!!
interface Props {
  children?: any;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  handleAdd: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  handleDone: () => {},
  dispatch: () => {},
  todo: "",
  todos: [],
  isEditing: false,
  editedTodo: "",
});

export const useTodosManager = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  //handle Add
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (state.todo) {
      const newList = [
        ...state.todos,
        {
          id: Math.random() * 70,
          todo: state.todo,
          isDone: false,
        },
      ];

      //add to do to the list
      dispatch({ type: ActionType.UPDATE_LIST, payload: newList });

      //clear todo message state (also clears the input because of the two ways binding)
      dispatch({ type: ActionType.UPDATE_TODO, payload: "" });
    }
  };

  //handle check
  const handleDone = (id: number) => {
    const newList = state.todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: true } : todo
    );
    dispatch({ type: ActionType.UPDATE_LIST, payload: newList });
  };

  //handle delete
  const handleDelete = (id: number) => {
    const newList = state.todos.filter((todo) => todo.id !== id);
    dispatch({ type: ActionType.UPDATE_LIST, payload: newList });
  };

  //handle edit
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    const newList = state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: state.editedTodo };
      } else {
        return todo;
      }
    });

    dispatch({ type: ActionType.UPDATE_LIST, payload: newList });
    dispatch({ type: ActionType.EDITING, payload: false });
    if (!state.editedTodo) {
      handleDelete(id);
    }
  };
  return {
    ...state,
    handleAdd,
    handleDelete,
    handleEdit,
    handleDone,
    dispatch,
  };
};

//Provider

export const TodosProvider: React.FunctionComponent<Props> = ({ children }) => (
  <TodoContext.Provider value={useTodosManager()}>
    {children}
  </TodoContext.Provider>
);

//custom hook

export const useTodos = (): UseTodosManagerResult => {
  const ctx = useContext(TodoContext);
  return ctx;
};
