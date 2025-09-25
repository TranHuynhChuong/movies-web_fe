import { toKebabWithId } from './kebabCase';

export function getLink(path: string, name?: string, id?: string): string {
  if (!name || !id) return path;
  const slug = toKebabWithId(name, id);
  return path + '/' + slug;
}
