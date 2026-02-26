import { createMachine, assign, fromCallback } from "xstate";

export interface StopWatchContext {
  elapsedTime: number;
  laps: number[];
}

export type StopWatchEvent =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "LAP" }
  | { type: "RESET" }
  | { type: "TICK" };

export const stopWatchMachine = createMachine({
  id: "stopWatch",
  initial: "idle",
  types: {} as { context: StopWatchContext; events: StopWatchEvent },
  context: {
    elapsedTime: 0,
    laps: [],
  },
  // Global transitions
  on: {
    RESET: {
      target: ".idle",
      actions: assign({
        elapsedTime: 0,
        laps: [],
      }),
    },
  },
  states: {
    idle: {
      on: { START: "running" },
    },
    running: {
      invoke: {
        src: fromCallback(({ sendBack }) => {
          const interval = setInterval(() => sendBack({ type: "TICK" }), 1000);

          return () => clearInterval(interval);
        }),
      },
      on: {
        TICK: {
          actions: assign(({ context }) => ({
            elapsedTime: context.elapsedTime + 1000,
          })),
        },
        STOP: "idle",
      },
    },
  },
});
