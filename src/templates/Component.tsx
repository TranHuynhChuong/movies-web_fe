#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

// Lấy tên component từ args
const name = process.argv[2];

if (!name) {
  console.error('Usage: ts-node create-component.ts ComponentName');
  process.exit(1);
}

// Thư mục đích: src/components/ui
const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

// Tạo folder nếu chưa tồn tại
if (!fs.existsSync(uiDir)) {
  fs.mkdirSync(uiDir, { recursive: true });
  console.log(`Created folder: ${uiDir}`);
}

// Nội dung skeleton component
const content = `import React from 'react';

type ${name}Props = {
  // props here
};

export const ${name}: React.FC<${name}Props> = ({  }) => {
  return (
    <div>
      {/* JSX here */}
    </div>
  );
};
`;

// Tạo file .tsx trong src/components/ui
const filePath = path.join(uiDir, `${name}.tsx`);
fs.writeFileSync(filePath, content);

console.log(`${name}.tsx created at ${filePath}`);
