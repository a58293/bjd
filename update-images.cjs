const fs = require('fs');

// 1. Update constants.ts
let constants = fs.readFileSync('constants.ts', 'utf-8');

const baseVar = "export const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main'; // [修改此处] 替换为您的 GitHub Raw 地址";

if (!constants.includes('BASE_IMAGE_URL')) {
  constants = constants.replace(
    "import { Goddess, Language } from './types';",
    "import { Goddess, Language } from './types';\n\n" + baseVar
  );
}

// Replace all './xxx.jpg' with `${BASE_IMAGE_URL}/xxx.webp`
constants = constants.replace(/'\.\/([^']+)\.jpg'/g, '`${BASE_IMAGE_URL}/$1.webp`');

fs.writeFileSync('constants.ts', constants);

// 2. Update PortalView.tsx
let portal = fs.readFileSync('components/PortalView.tsx', 'utf-8');

if (!portal.includes('BASE_IMAGE_URL')) {
  portal = portal.replace(
    "import { Goddess, Language } from '../types';",
    "import { Goddess, Language } from '../types';\nimport { BASE_IMAGE_URL } from '../constants';"
  );
}

portal = portal.replace(/src="\.\/portal-bg\.jpg"/g, 'src={`${BASE_IMAGE_URL}/portal-bg.webp`}');

fs.writeFileSync('components/PortalView.tsx', portal);

console.log('Images updated to use BASE_IMAGE_URL and .webp format.');
