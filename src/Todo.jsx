import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
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
      className={` ${todo.isCompleted ? "bg-lime-700" : "bg-indigo-500"} text-white p-4 rounded-lg mb-3 transition-colors duration-300`}
    >
      <CardContent>
        <Typography
          className={` ${todo.isCompleted ? "line-through" : ""}`}
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

        <Typography
          className={` ${todo.isCompleted ? "line-through" : ""}`}
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
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", sm: "flex-end" },
          gap: { xs: 1, sm: 1.5 },
          px: 1,
        }}
      >
        <Button
          onClick={handelCompleteClick}
          sx={{
            backgroundColor: "white",
            color: "#4f46e5",
            borderRadius: "50px",
            fontWeight: "bold",
            minWidth: { xs: "40px", sm: "auto" },
            padding: { xs: "8px", sm: "6px 16px" },
            "&:hover": {
              backgroundColor: "#94f70a7d",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CheckIcon sx={{ mr: { xs: 0, sm: 0.5 } }} />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Complete
          </Box>
        </Button>
        <Button
          onClick={handleDeleteClick}
          sx={{
            backgroundColor: "white",
            color: "#e11d48",
            borderRadius: "50px",
            fontWeight: "bold",
            minWidth: { xs: "40px", sm: "auto" },
            padding: { xs: "8px", sm: "6px 16px" },
            ":hover": { backgroundColor: "#ffe4e6" },
            transition: "all 0.3s ease",
          }}
        >
          <DeleteIcon sx={{ mr: { xs: 0, sm: 0.5 } }} />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Delete
          </Box>
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
            backgroundColor: "white",
            color: "#4f46e5",
            borderRadius: "50px",
            fontWeight: "bold",
            minWidth: { xs: "40px", sm: "auto" },
            padding: { xs: "8px", sm: "6px 16px" },
            ":hover": { backgroundColor: "#e0e7ff" },
            transition: "all 0.3s ease",
          }}
        >
          <EditIcon sx={{ mr: { xs: 0, sm: 0.5 } }} />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Edit
          </Box>
        </Button>
      </CardActions>
    </div>
  );
}
