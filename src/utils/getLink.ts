import { toKebabWithId } from './kebabCase';

export function getLink(path: string, value?: string, id?: string): string {
  if (!value || !id) return path;
  const slug = toKebabWithId(value, id);
  if (path === '/nam') return path + '/' + value;
  return path + '/' + slug;
}
