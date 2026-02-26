import StopWatch from "./components/StopWatch/StopWatch";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1440px",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <StopWatch />
    </Box>
  );
}

export default App;
