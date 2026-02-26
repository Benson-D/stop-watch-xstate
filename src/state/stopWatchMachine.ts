import { createMachine } from "xstate";

export const stopWatchMachine = createMachine({
	id: "stopWatch",
	initial: "idle"
})