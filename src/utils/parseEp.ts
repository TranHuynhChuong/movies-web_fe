/**
 * Chuyển đổi param ep từ URL sang số tập
 * - "full" => 1
 * - "tap-1" => 1
 * - "anything else" => null
 */
export function parseEp(ep: string): number | null {
  if (!ep) return null;

  // Trường hợp "full"
  if (ep.toLowerCase() === 'full') {
    return 1;
  }

  // Trường hợp "tap-<số>"
  const regex = /^tap-(\d+)$/i;
  const match = regex.exec(ep);
  if (match) {
    return parseInt(match[1], 10);
  }

  // Không khớp => null
  return null;
}
