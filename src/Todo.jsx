import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import RedoIcon from "@mui/icons-material/Redo";
import { useContext } from "react";
import TodosContext from "./TodosContext/context";
import { showEditTask, showDeleteConfirm } from "./Alerts";
export default function Todo({ todo }) {
  const { handleToggleComplete, handleDeleteTodo } = useContext(TodosContext);

  const handelCompleteClick = () => {
    handleToggleComplete(todo.id);
  };

  const handleDeleteClick = () => {
    showDeleteConfirm({
      title: "هل أنت متأكد؟",
      text: "تريد حذف هذه المهمة نهائياً",
      onConfirm: () => {
        handleDeleteTodo(todo.id);
      },
    });
  };

  const { handleEditTodo } = useContext(TodosContext);

  return (
    <div
      className={` ${
        todo.isCompleted ? "bg-lime-700" : "bg-indigo-500"
      } text-white p-4 rounded-xl mb-3 transition-colors duration-300 shadow-sm`}
    >
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Typography
          className={` ${todo.isCompleted ? "line-through opacity-80" : ""}`}
          sx={{
            marginBottom: "10px",
            fontSize: { xs: "18px", sm: "22px", md: "25px" },
            fontFamily: "'Playwrite GB J', cursive",
            fontWeight: "bold",
            wordBreak: "break-word",
          }}
        >
          {todo.title}
        </Typography>

        {todo.details && (
          <Typography
            className={` ${todo.isCompleted ? "line-through opacity-70" : ""}`}
            sx={{
              marginBottom: "10px",
              fontSize: { xs: "16px", sm: "20px", md: "25px" },
              fontFamily: "'Playwrite GB J', cursive",
              fontWeight: "normal",
              wordBreak: "break-word",
            }}
          >
            {todo.details}
          </Typography>
        )}
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: { xs: "right", sm: "flex-end" },
          alignItems: "center",
          gap: { xs: 0.1, sm: 1 },
          pt: 2,
          px: 0,
          width: "100%",
        }}
      >
        <Button
          onClick={handelCompleteClick}
          sx={{
            fontFamily: "'Alexandria', cursive",
            backgroundColor: "white",
            color: "#4f46e5",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: { xs: "10px", sm: "13px" },
            padding: { xs: "4px 8px", sm: "6px 14px" },
            minWidth: "auto",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            "&:hover": {
              backgroundColor: "#94f70a7d",
            },
            transition: "all 0.3s ease",
          }}
        >
          {todo.isCompleted ? (
            <RedoIcon sx={{ mr: 0.3, fontSize: { xs: "14px", sm: "18px" } }} />
          ) : (
            <CheckIcon sx={{ mr: 0.3, fontSize: { xs: "14px", sm: "18px" } }} />
          )}
          <span>{todo.isCompleted ? "تراجع" : "إتمام"}</span>
        </Button>

        <Button
          onClick={handleDeleteClick}
          sx={{
            fontFamily: "'Alexandria', cursive",
            backgroundColor: "white",
            color: "#e11d48",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: { xs: "10px", sm: "13px" },
            padding: { xs: "4px 8px", sm: "6px 14px" },
            minWidth: "auto",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            "&:hover": { backgroundColor: "#ffe4e6" },
            transition: "all 0.3s ease",
          }}
        >
          <DeleteIcon sx={{ mr: 0.3, fontSize: { xs: "14px", sm: "18px" } }} />
          <span>حذف</span>
        </Button>

        <Button
          onClick={() => {
            showEditTask({
              initialTitle: todo.title,
              initialDetails: todo.details,
              onConfirm: ({ title, details }) => {
                handleEditTodo(todo.id, title, details);
              },
            });
          }}
          sx={{
            fontFamily: "'Alexandria', cursive",
            backgroundColor: "white",
            color: "#4f46e5",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: { xs: "10px", sm: "13px" },
            padding: { xs: "4px 8px", sm: "6px 14px" },
            minWidth: "auto",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            "&:hover": { backgroundColor: "#e0e7ff" },
            transition: "all 0.3s ease",
          }}
        >
          <EditIcon sx={{ mr: 0.3, fontSize: { xs: "14px", sm: "18px" } }} />
          <span>تعديل</span>
        </Button>
      </CardActions>
    </div>
  );
}
