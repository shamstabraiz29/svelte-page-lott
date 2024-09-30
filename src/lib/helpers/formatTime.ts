export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  const formattedHours =
    hours < 10 ? hours.toString().padStart(1, "0") : hours.toString();
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}<span class="animated-colon px-1">:</span>${formattedMinutes}`;
}
