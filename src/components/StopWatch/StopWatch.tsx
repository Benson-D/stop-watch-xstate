import { Box, Typography } from "@mui/material";
import { convertToMilliseconds } from "../../util/convertToMilliseconds";
import { StopWatchButtons } from "./StopWatchButtons";
import { useStopWatch } from "../../hooks/useStopWatch";

export default function StopWatch() {
  const {
    elapsedTime,
    laps,
    lapColors,
    isRunning,
    send,
    canLap,
    errorMessage,
    isStopped,
  } = useStopWatch();

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
          {convertToMilliseconds(elapsedTime)}
        </Typography>
      </Box>

      <StopWatchButtons
        elapsedTime={elapsedTime}
        send={send}
        canLap={canLap}
        isRunning={isRunning}
        isStopped={isStopped}
      />

      {/* Laps Section */}
      {laps.length > 0 && (
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
            {laps.map((lap, idx) => (
              <Typography
                key={idx}
                variant="body1"
                sx={{ marginLeft: "2rem", color: lapColors[idx] }}
              >
                Lap {idx + 1}: {convertToMilliseconds(lap)}
              </Typography>
            ))}
          </Box>
          {errorMessage && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginTop: "1rem", textAlign: "center" }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}
