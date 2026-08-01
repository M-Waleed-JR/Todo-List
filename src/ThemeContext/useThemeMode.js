import { useContext } from "react";
import ThemeContext from "./context";

export function useThemeMode() {
  return useContext(ThemeContext);
}
