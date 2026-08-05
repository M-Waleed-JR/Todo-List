import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

const FILTERS = [
  { value: "completed", label: "تم الانتهاء" },
  { value: "pending", label: "قيد التنفيذ" },
  { value: "all", label: "الكل" },
];

export default function Filter({ currentFilter, onFilterChange }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const inactiveColor = isDark ? "#475569" : "#90a1b9";

  const buttonSx = (isActive) => ({
    fontFamily: "Alexandria",
    borderRadius: "70px",
    backgroundColor: isActive ? "#155dfc" : inactiveColor,
    color: "white",
    fontWeight: "bold",
    height: "36px",
    flex: { xs: 1, sm: "initial" },
    fontSize: { xs: "11px", sm: "14px" },
    px: { xs: 1, sm: 3 },
    whiteSpace: "nowrap",
    transition: "background-color 0.8s ease",
  });

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
      sx={{
        mx: "auto",
        my: { xs: 2, sm: 4 },
        width: "100%",
        justifyContent: "center",
      }}
    >
      {FILTERS.map(({ value, label }) => (
        <Button
          key={value}
          onClick={() => onFilterChange(value)}
          variant="contained"
          sx={buttonSx(currentFilter === value)}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
}
