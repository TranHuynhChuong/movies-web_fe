import { kebabCase } from 'lodash';

/**
 * Chuyển một chuỗi `name` thành định dạng kebab-case và gắn thêm `id`.
 *
 * Ví dụ:
 * ```ts
 * toKebabWithId("Phim Hay", 123) // -> "phim-hay.123"
 * ```
 *
 * @param name - Chuỗi cần chuyển đổi (ví dụ tên phim, thể loại, ...)
 * @param id - ID đi kèm để tạo slug duy nhất (string hoặc number)
 * @returns Chuỗi slug ở dạng `kebab-case.id`
 */
export function toKebabWithId(name: string, id: string | number): string {
  const noAccent = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const slug = kebabCase(noAccent);
  return `${slug}.${id}`;
}

/**
 * Trích xuất ID từ một slug có định dạng `label.id`.
 *
 * Ví dụ:
 * ```ts
 * extractId("phim-hay.123") // -> "123"
 * extractId("no-id")         // -> "no-id"
 * ```
 *
 * @param slug - Chuỗi slug cần trích xuất ID
 * @returns ID dạng string. Nếu slug không có dấu chấm, trả về toàn bộ slug
 */
export function extractId(slug: string): string {
  if (!slug.includes('.')) {
    return slug;
  }
  const parts = slug.split('.');
  return parts[parts.length - 1];
}

/**
 * Trích xuất phần label từ một slug có định dạng `label.id`.
 *
 * Ví dụ:
 * ```tss
 * extractLable("phim-hay.123") // -> "phim-hay"
 * ```
 *
 * @param slug - Chuỗi slug cần trích xuất label
 * @returns Phần label trước dấu chấm
 */
export function extractLable(slug: string): string {
  const parts = slug.split('.');
  return parts[0];
}
