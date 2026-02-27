import { setup, assign, fromCallback } from "xstate";

export interface StopWatchContext {
  elapsedTime: number;
  laps: number[];
  lastLapTime: number;
  lapColors: ("green" | "red" | "black")[];
  errorMessage?: string;
}

export type StopWatchEvent =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "LAP" }
  | { type: "RESET" }
  | { type: "TICK" };

const INTERVAL_MS = 10;
const MAX_LAPS = 10;

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
    canRecordLap: ({ context }) =>
      context.elapsedTime > 0 && context.laps.length < MAX_LAPS,
    canReset: ({ context }) =>
      context.elapsedTime > 0 || context.laps.length > 0,
    canStop: ({ context }) => context.elapsedTime > 0,
  },
  actions: {
    incrementTime: assign({
      elapsedTime: ({ context }) => context.elapsedTime + INTERVAL_MS,
    }),
    addLap: assign({
      laps: ({ context }) => {
        const newLap = context.elapsedTime - context.lastLapTime;
        return [...context.laps, newLap];
      },
      lastLapTime: ({ context }) => context.elapsedTime,
      lapColors: ({ context }) => {
        const newLap = context.elapsedTime - context.lastLapTime;
        const newLaps = [...context.laps, newLap];
        if (newLaps.length <= 2) return ["black"];

        const fastestLap = Math.min(...newLaps);
        const slowestLap = Math.max(...newLaps);

        return newLaps.map((lap) => {
          if (lap === fastestLap) return "green";
          if (lap === slowestLap) return "red";
          return "black";
        });
      },
    }),
    showMaxLapError: assign({
      errorMessage: () => `Maximum of ${MAX_LAPS} laps reached`,
    }),
  },
  actors: {
    interval: intervalActor,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4HsAOB1AhigxgBYDEASgKIDK5AKgNoAMAuoqBmrAJYqdoB2rEAA9EAFgBMAGhABPROIBsADgB0S0QoDMyzQwCMAdgCsR0QF8z01JlwFCKzhAA2YYpRoBBUvWaD2XHn5BEQRNcQBOFQMJPXCDPSMlcVFRcKNpOQQIyPCGBUUwpTTRTU0LK3RsPCIVACcAVz4+Tj4oYhoASQBhAGlGFiQQf25eAUGQ0USVQr1NcPC9RXFtDMRDAxU0zT0NEsTwzSNykGsquzrG5tbiABkPAAV+vw4RoPGxbRUjAwYwjQZ4gdRAZVgglHovgwoTsFAlogoFOZLCdKrYag0mi02u4APKPXyDYaBMagEKlVSzcRJUR6LQMZJSWTyVIqUR5cRGBhGcSKJQKcIWZF8NAQOCCU5owjPAKjYKIAC0ClBipUULV6o1BmOEuq9kcLmlrxJwmZEIZsQUiUmnPEIKZWXC4mmPMdBiS6ih321qN1F0xrUNxLlCEmDBUlvyCjdSgM-IM8dBtsibPybo5CgYbM0WsFQA */
  id: "stopWatch",
  initial: "idle",
  context: {
    elapsedTime: 0,
    lastLapTime: 0,
    laps: [],
    lapColors: [],
    errorMessage: undefined,
  },
  // Global transitions
  on: {
    RESET: {
      guard: "canReset",
      target: ".idle",
      actions: assign({
        elapsedTime: 0,
        laps: [],
        lastLapTime: 0,
        lapColors: [],
        errorMessage: undefined,
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
        TICK: { actions: "incrementTime" },
        LAP: [
          { guard: "canRecordLap", actions: "addLap" },
          { actions: "showMaxLapError" },
        ],
        STOP: "idle",
      },
    },
  },
});
