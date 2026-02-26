import { useMachine, useSelector } from "@xstate/react";
import { stopWatchMachine } from "../state/stopWatchMachine";

export const useStopWatch = () => {
  const [state, send, service] = useMachine(stopWatchMachine);

  // State selectors
  const elapsedTime = useSelector(service, (s) => s.context.elapsedTime);
  const laps = useSelector(service, (s) => s.context.laps);
  const isRunning = useSelector(service, (s) => s.matches("running"));

  // "Can" guards for buttons
  const canLap = useSelector(service, (s) => s.can({ type: "LAP" }));

  return {
    state,
    send,
    service,
    elapsedTime,
    laps,
    canLap,
    isRunning,
  };
};
