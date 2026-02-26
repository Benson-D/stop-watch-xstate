import { setup, assign, fromCallback } from "xstate";

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

const INTERVAL_MS = 10;

const intervalActor = fromCallback(({ sendBack }) => {
  const interval = setInterval(() => sendBack({ type: "TICK" }), INTERVAL_MS);
  return () => clearInterval(interval);
});

export const stopWatchMachine = setup({
  types: {} as {
    context: StopWatchContext;
    events: StopWatchEvent;
  },
  guards: {
    canRecordLap: ({ context }) => context.elapsedTime > 0,
	canReset: ({ context }) => context.elapsedTime > 0 || context.laps.length > 0,
	canStop: ({ context }) => context.elapsedTime > 0,
  },
  actions: {
    incrementTime: assign({
      elapsedTime: ({ context }) => context.elapsedTime + INTERVAL_MS,
    }),
    addLap: assign({
      laps: ({ context }) => [...context.laps, context.elapsedTime],
    }),
  },
  actors: {
    interval: intervalActor,
  },
}).createMachine({
  id: "stopWatch",
  initial: "idle",
  context: {
    elapsedTime: 0,
    laps: [],
  },
  // Global transitions
  on: {
    RESET: {
      guard: "canReset",
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
        src: "interval",
      },
      on: {
        STOP: "idle",
        TICK: { actions: "incrementTime" },
        LAP: [{ guard: "canRecordLap", actions: "addLap" }],
      },
    },
  },
});
