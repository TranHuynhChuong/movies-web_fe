import { kebabCase } from 'lodash';

export function toKebabWithId(name: string, id: string | number): string {
  const noAccent = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // loại bỏ dấu
  const slug = kebabCase(noAccent);
  return `${slug}.${id}`;
}

export function extractId(slug: string): string {
  const parts = slug.split('.');
  return parts[parts.length - 1];
}

export function extractname(slug: string): string {
  const parts = slug.split('.');
  return parts[0];
}
