export function formatDuration(seconds: number): string {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = "";

  if (days > 0) {
    result += `<span class="font-fractul font-normal">${days}</span> 日 `;
  }

  if (hours > 0 || days > 0) {
    result += `<span class="font-fractul font-normal">${hours}</span> 時間 `;
  }

  if (minutes > 0 || hours > 0 || days > 0) {
    result += `<span class="font-fractul font-normal">${minutes}</span> 分`;
  }

  return result.trim();
}
