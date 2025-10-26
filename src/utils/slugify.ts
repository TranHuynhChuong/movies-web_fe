export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
    .replace(/[^a-zA-Z0-9]+/g, '-') // thay khoảng trắng và ký tự đặc biệt
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}
