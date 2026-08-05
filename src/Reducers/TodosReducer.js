export const ADD_TODO = "todos/add";
export const TOGGLE_TODO = "todos/toggle";
export const DELETE_TODO = "todos/delete";
export const EDIT_TODO = "todos/edit";

export default function TodosReducer(todos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...todos, action.payload];

    case TOGGLE_TODO:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo,
      );

    case DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);

    case EDIT_TODO:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
              details: action.payload.details,
            }
          : todo,
      );

    default:
      return todos;
  }
}
