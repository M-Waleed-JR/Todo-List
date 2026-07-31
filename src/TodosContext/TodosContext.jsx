import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodosContext from "./context";

const initailTodos = [];

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    try {
      const storageTodos = localStorage.getItem("todos");
      return storageTodos ? JSON.parse(storageTodos) : initailTodos;
    } catch (e) {
      console.error("فشل في قراءة البيانات", e);
      return initailTodos;
    }
  });

  const [titleInput, setTitleInput] = useState("");

  const handelAddClick = () => {
    if (!titleInput.trim()) return;
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (id, newTitle, newDetails) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, title: newTitle, details: newDetails } : t,
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  return (
    <TodosContext.Provider
      value={{
        todos,
        titleInput,
        setTitleInput,
        handelAddClick,
        handleToggleComplete,
        handleDeleteTodo,
        handleEditTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
