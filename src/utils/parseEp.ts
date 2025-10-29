/**
 * Chuyển chuỗi biểu diễn tập phim thành số tập.
 *
 * Xử lý các trường hợp:
 * - `"full"` (không phân biệt chữ hoa/thường) => trả về 1
 * - `"tap-<số>"` => trả về số tương ứng
 * - Chuỗi không hợp lệ hoặc rỗng => trả về null
 *
 * Ví dụ:
 * ```ts
 * parseEp("full")     // -> 1
 * parseEp("tap-5")    // -> 5
 * parseEp("tap-001")  // -> 1
 * parseEp("unknown")  // -> null
 * parseEp("")         // -> null
 * ```
 *
 * @param ep - Chuỗi biểu diễn tập phim
 * @returns Số tập (number) nếu hợp lệ, hoặc null nếu không hợp lệ
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
