import React from 'react';
import type { SVGProps } from 'react';

export function IconListSearch(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.7}
        d="M11 15a4 4 0 1 0 8 0a4 4 0 1 0-8 0m7.5 3.5L21 21M4 6h16M4 12h4m-4 6h4"
      ></path>
    </svg>
  );
}
