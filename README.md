# ⏱ Stopwatch

A simple stopwatch application built with **React**, **TypeScript**, **Material UI (MUI)**, and **XState**.

The purpose of this project is to better understand how to model application behavior using a state machine.

---

## 🚀 Tech Stack

- React
- TypeScript
- Material UI (MUI)
- XState

---

## ⚙️ Getting Started

Clone the repo and install dependencies using your package manager of choice:

```bash
# using npm
git clone <repo-url>
cd stop-watch-xstate
pnpm install
# or pnpm install / yarn install
```

Run the development server locally:

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173` by default.

You can also build for production with `npm run build` and preview the result with `npm run preview`.

---

- **Live demo:** [https://stop-watch-xstate.netlify.app/](https://stop-watch-xstate.netlify.app/)

---

## 🧠 Machine Overview

The core behaviour is defined in `src/state/stopWatchMachine.ts` using XState. The machine has:

### States

- **idle** – initial state. Waiting to start.
- **running** – timer is active; ticks every 10ms via an interval actor.

### Events & Transitions

| Event  | From      | To       | Guard       | Action        |
|--------|-----------|----------|-------------|---------------|
| START  | idle      | running  | —           | —             |
| TICK   | running   | running  | —           | `incrementTime` (adds 10ms) |
| STOP   | running   | idle     | —           | —             |
| LAP    | running   | running  | `canRecordLap` | `addLap` or `showMaxLapError` |
| RESET  | *         | idle     | `canReset`  | clear context (time, laps, colors) |

### Context

- `elapsedTime: number` – total milliseconds since start (resets on `RESET`).
- `lastLapTime: number` – elapsedTime at last lap, used to compute lap durations.
- `laps: number[]` – array of lap durations.
- `lapColors: ("green"|"red"|"black")[]` – color tags for fastest/slowest laps.
- `errorMessage?: string` – set when max laps reached.

### Guards

- `canRecordLap` – only if `elapsedTime > 0` and under max laps (10).
- `canReset` – if there's any elapsed time or recorded laps.
- `canStop` – if the stopwatch has been started (elapsedTime > 0).

### Actions

- `incrementTime` – adds `INTERVAL_MS` (10) to `elapsedTime` each tick.
- `addLap` – compute a new lap duration, append to `laps`, update `lastLapTime`, and recompute `lapColors` based on durations.
- `showMaxLapError` – sets `errorMessage` when lap limit exceeded.

### Actors

- `interval` – callback actor using `setInterval` sending `TICK` every 10ms; cleaned up automatically when leaving `running`.

This machine drives the UI via the custom `useStopWatch` hook and provides the application with predictable, testable state transitions.
