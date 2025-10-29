/**
 * Chuyển một chuỗi thành dạng "slug" chuẩn URL.
 *
 * Hàm thực hiện các bước:
 * 1. Loại bỏ dấu tiếng Việt (normalize + regex)
 * 2. Thay khoảng trắng và ký tự đặc biệt bằng dấu gạch ngang "-"
 * 3. Xóa các dấu gạch ngang thừa ở đầu và cuối
 * 4. Chuyển tất cả ký tự về chữ thường
 *
 * Ví dụ:
 * ```ts
 * slugify("Phim Hay Nhất 2025!") // -> "phim-hay-nhat-2025"
 * slugify("Đặc biệt & Hot")      // -> "dac-biet-hot"
 * ```
 *
 * @param str - Chuỗi cần chuyển đổi
 * @returns Chuỗi dạng slug, an toàn để dùng trong URL
 */
export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
    .replace(/[^a-zA-Z0-9]+/g, '-') // thay khoảng trắng và ký tự đặc biệt
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}
