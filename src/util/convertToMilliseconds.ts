export function convertToMilliseconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);

  const milliseconds = Math.floor((ms % 1000) / 10);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  const addHours = hours > 0 ? `${pad(hours)}:` : "";

  return `${addHours}${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}
