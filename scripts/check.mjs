import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('index.html', 'utf8');
for (const [, url] of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)) {
 if (url.startsWith('#')) assert.ok(html.includes(`id="${url.slice(1)}"`), url);
 if (url.startsWith('./')) assert.ok(existsSync(url.split('?')[0]), url);
}
assert.ok(!html.includes('/new/investors/'));
assert.ok(html.includes('The Light Company Inc.'));
assert.ok(!html.includes('https://superception.ai./'));
assert.ok(!existsSync('dist/draft'));
console.log('Production links, footer, and draft exclusion checked.');
