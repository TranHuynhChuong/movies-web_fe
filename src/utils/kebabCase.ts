import { kebabCase } from 'lodash';

export function toKebabWithId(name: string, id: string | number): string {
  const noAccent = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const slug = kebabCase(noAccent);
  return `${slug}.${id}`;
}

export function extractId(slug: string): string {
  if (!slug.includes('.')) {
    return slug;
  }
  const parts = slug.split('.');
  return parts[parts.length - 1];
}

export function extractLable(slug: string): string {
  const parts = slug.split('.');
  return parts[0];
}
