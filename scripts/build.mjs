import { rmSync, mkdirSync, cpSync, writeFileSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const file of ['index.html', 'favicon.svg', 'assets']) cpSync(file, `dist/${file}`, { recursive: true });
writeFileSync('dist/.nojekyll', '');
