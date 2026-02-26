import { Box, Button } from "@mui/material";

interface StopWatchButtonsProps {
  send: (event: { type: "START" | "STOP" | "LAP" | "RESET" }) => void;
  canLap: boolean;
  isRunning: boolean;
  elapsedTime: number;
}

export const StopWatchButtons = ({
  elapsedTime,
  send,
  canLap,
  isRunning,
}: StopWatchButtonsProps) => {
  return (
    <Box sx={{ display: "flex", gap: 2, marginTop: "1rem" }}>
      {isRunning ? (
        <Button
          variant="outlined"
          color="error"
          onClick={() => send({ type: "STOP" })}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="success"
          onClick={() => send({ type: "START" })}
        >
          Start
        </Button>
      )}
      <Button
        disabled={!canLap}
        variant="outlined"
        color="info"
        onClick={() => send({ type: "LAP" })}
      >
        Lap
      </Button>
      {elapsedTime > 0 && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => send({ type: "RESET" })}
        >
          Reset
        </Button>
      )}
    </Box>
  );
};
