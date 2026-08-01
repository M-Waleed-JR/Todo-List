import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import ThemeContext from "./context";

const getInitialMode = () => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch (e) {
    console.error("فشل في قراءة وضع العرض", e);
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem("theme", mode);
    } catch (e) {
      console.error("فشل في حفظ وضع العرض", e);
    }
  }, [mode]);

  const toggleMode = useCallback(
    () => setMode((m) => (m === "dark" ? "light" : "dark")),
    [],
  );

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode],
  );

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
