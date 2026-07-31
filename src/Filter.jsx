import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Filter({ currentFilter, onFilterChange }) {
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
      <Button
        onClick={() => onFilterChange("completed")}
        variant="contained"
        sx={{
          fontFamily: "Alexandria",
          borderRadius: "70px",
          backgroundColor:
            currentFilter === "completed" ? "#155dfc" : "#90a1b9",
          color: "white",
          fontWeight: "bold",
          height: "36px",
          flex: { xs: 1, sm: "initial" },
          fontSize: { xs: "11px", sm: "14px" },
          px: { xs: 1, sm: 3 },
          whiteSpace: "nowrap",
          transition: "background-color 0.8s ease",
        }}
      >
        تم الانتهاء
      </Button>

      <Button
        onClick={() => onFilterChange("pending")}
        variant="contained"
        sx={{
          fontFamily: "Alexandria",
          borderRadius: "70px",
          backgroundColor: currentFilter === "pending" ? "#155dfc" : "#90a1b9",
          color: "white",
          fontWeight: "bold",
          height: "36px",
          flex: { xs: 1, sm: "initial" },
          fontSize: { xs: "11px", sm: "14px" },
          px: { xs: 1, sm: 3 },
          whiteSpace: "nowrap",
          transition: "background-color 0.8s ease",
        }}
      >
        قيد التنفيذ
      </Button>

      <Button
        onClick={() => onFilterChange("all")}
        variant="contained"
        sx={{
          fontFamily: "Alexandria",
          borderRadius: "70px",
          backgroundColor: currentFilter === "all" ? "#155dfc" : "#90a1b9",
          color: "white",
          fontWeight: "bold",
          height: "36px",
          flex: { xs: 1, sm: "initial" },
          fontSize: { xs: "11px", sm: "14px" },
          px: { xs: 1, sm: 3 },
          whiteSpace: "nowrap",
          transition: "background-color 0.8s ease",
        }}
      >
        الكل
      </Button>
    </Stack>
  );
}
