import Filter from "./Filter";
import Todo from "./Todo";
import { useContext, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import TodosContext from "./TodosContext/context";
import { TodosProvider } from "./TodosContext/TodosContext";
import { ThemeProvider } from "./ThemeContext/ThemeContext";
import { useThemeMode } from "./ThemeContext/useThemeMode";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";

function AppContent() {
  const { todos, titleInput, setTitleInput, handleAddClick } =
    useContext(TodosContext);
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [currentFilter, setCurrentFilter] = useState("all");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const showLabelNotch = isInputFocused || titleInput.trim().length > 0;

  const filteredTodos = useMemo(() => {
    return todos.filter((t) => {
      if (currentFilter === "completed") {
        return t.isCompleted;
      }
      if (currentFilter === "pending") {
        return !t.isCompleted;
      }
      return true;
    });
  }, [todos, currentFilter]);

  const todosContent = filteredTodos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  return (
    <div className="relative mx-auto w-[calc(100%-2rem)] max-w-2xl max-h-[92vh] sm:max-h-[87vh] h-fit my-4 sm:my-8 md:my-16 bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-300 dark:shadow-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
      <IconButton
        onClick={toggleMode}
        aria-label="toggle theme"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: isDark ? "#334155" : "white",
          color: isDark ? "#c7d2fe" : "#4f46e5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: isDark ? "#475569" : "#e0e7ff",
          },
        }}
      >
        {mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
      </IconButton>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-indigo-500 dark:text-indigo-400 font-[Alexandria]">
        مهامي
      </h1>

      <Filter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:items-center">
        <div className="relative flex-1 w-full">
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="أضف مهمة جديدة"
              value={titleInput}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(e) => setTitleInput(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: showLabelNotch,
                },
                input: {
                  notched: showLabelNotch,
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  fontWeight: 500,
                  fontFamily: "Alexandria, sans-serif",
                  color: isDark ? "#e2e8f0" : "#1e293b",
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "Alexandria, sans-serif",
                  color: "rgb(148, 163, 184)",
                },

                "& .MuiOutlinedInput-notchedOutline legend": {
                  display: showLabelNotch ? "block" : "none",
                  maxWidth: showLabelNotch ? "100%" : 0,
                  fontSize: "0.75em",
                  fontFamily: "Alexandria, sans-serif",
                  padding: showLabelNotch ? "0 6px" : 0,
                  transition: "max-width 0.2s ease",
                },

                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -10px) scale(0.85)",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "1rem",
                  transition: "all 0.2s ease-in-out",
                  "& fieldset": {
                    borderColor: isDark
                      ? "rgb(51, 65, 85)"
                      : "rgb(226, 232, 240)",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: isDark
                      ? "rgb(71, 85, 105)"
                      : "rgb(203, 213, 225)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "none !important",
                    "& fieldset": {
                      borderColor: "rgb(99, 102, 241)",
                      borderWidth: "2px",
                    },
                  },
                },
              }}
            />
          </Box>
        </div>
        <button
          onClick={handleAddClick}
          className="font-[playwriteGBJ] w-full sm:w-auto rounded-xl cursor-pointer px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold transition-all shadow-md shadow-indigo-100 dark:shadow-indigo-950 whitespace-nowrap disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-300 dark:disabled:hover:bg-slate-700 disabled:active:scale-100 disabled:shadow-none text-center justify-center flex"
          disabled={!titleInput.trim()}
        >
          أضافة مهمة
        </button>
      </div>
      <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col gap-4">
        {todosContent}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TodosProvider>
        <AppContent />
      </TodosProvider>
    </ThemeProvider>
  );
}
