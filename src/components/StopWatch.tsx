import { Box, Button, Typography } from "@mui/material";
import { useMachine } from "@xstate/react";
import { stopWatchMachine } from "../state/stopWatchMachine";
import { convertToMilliseconds } from "../util/convertToMilliseconds";

export default function StopWatch() {
  const [state, send] = useMachine(stopWatchMachine);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ marginRight: "auto" }}>
        Stop Watch
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h2" gutterBottom>
          {convertToMilliseconds(state.context.elapsedTime)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: "1rem",
        }}
      >
        <Button
          variant="outlined"
          color="success"
          sx={{ marginTop: "1rem" }}
          onClick={() => send({ type: "START" })}
        >
          Start
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={() => send({ type: "STOP" })}
        >
          Stop
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={() => send({ type: "LAP" })}
        >
          Lap
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={() => send({ type: "RESET" })}
        >
          Reset
        </Button>
      </Box>

      {/* Laps Section */}
      {state.context.laps.length > 0 && (
        <Box sx={{ marginTop: "2rem", width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Laps
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {state.context.laps.map((lap, idx) => (
              <Typography key={idx} variant="body1" sx={{ marginLeft: "2rem" }}>
                Lap {idx + 1}: {convertToMilliseconds(lap)}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
