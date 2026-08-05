import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodosContext from "./context";
import TodosReducer, {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from "../Reducers/TodosReducer";

const STORAGE_KEY = "todos";

const getInitialTodos = () => {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("فشل في قراءة البيانات", error);
    return [];
  }
};

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(
    TodosReducer,
    undefined,
    getInitialTodos,
  );
  const [titleInput, setTitleInput] = useState("");

  // Persist todos whenever they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddClick = useCallback(() => {
    const title = titleInput.trim();
    if (!title) return;

    dispatch({
      type: ADD_TODO,
      payload: {
        id: uuidv4(),
        title,
        details: "",
        isCompleted: false,
      },
    });
    setTitleInput("");
  }, [titleInput]);

  const handleToggleComplete = useCallback((id) => {
    dispatch({ type: TOGGLE_TODO, payload: { id } });
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    dispatch({ type: DELETE_TODO, payload: { id } });
  }, []);

  const handleEditTodo = useCallback((id, title, details) => {
    dispatch({ type: EDIT_TODO, payload: { id, title, details } });
  }, []);

  const value = useMemo(
    () => ({
      todos,
      titleInput,
      setTitleInput,
      handleAddClick,
      handleToggleComplete,
      handleDeleteTodo,
      handleEditTodo,
    }),
    [
      todos,
      titleInput,
      handleAddClick,
      handleToggleComplete,
      handleDeleteTodo,
      handleEditTodo,
    ],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
