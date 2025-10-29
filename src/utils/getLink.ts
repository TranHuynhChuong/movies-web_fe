import { toKebabWithId } from './kebabCase';
/**
 * Tạo URL hoặc link dựa trên `path`, `value` và `id`.
 *
 * Hàm sẽ trả về:
 * - Nếu `value` hoặc `id` không tồn tại, trả về `path` gốc.
 * - Nếu `path` là '/nam', trả về path kết hợp với `value` (không chuyển sang kebab-case).
 * - Ngược lại, trả về path kết hợp với `slug` được tạo từ `value` và `id` (sử dụng `toKebabWithId`).
 *
 * Ví dụ:
 * ```ts
 * getLink('/movies', 'Avengers', '123') // -> '/movies/avengers.123'
 * getLink('/nam', 'Horror', '456')      // -> '/nam/Horror'
 * getLink('/movies')                     // -> '/movies'
 * ```
 *
 * @param path - Đường dẫn cơ sở (base path) của link.
 * @param value - Giá trị cần thêm vào path (ví dụ tên phim, thể loại, ...).
 * @param id - ID đi kèm để tạo slug duy nhất.
 * @returns URL hoàn chỉnh dạng string.
 */
export function getLink(path: string, value?: string, id?: string): string {
  if (!value || !id) return path;
  const slug = toKebabWithId(value, id);
  if (path === '/nam') return path + '/' + value;
  return path + '/' + slug;
}
