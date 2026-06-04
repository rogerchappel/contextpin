import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, '..');

test('package.json has valid structure', () => {
  const pkgPath = join(pkgRoot, 'package.json');
  assert.ok(existsSync(pkgPath));
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  assert.strictEqual(pkg.name, 'contextpin');
  assert.ok(pkg.version);
  assert.ok(Array.isArray(pkg.keywords) && pkg.keywords.length > 0);
  assert.ok(pkg.repository?.url);
  assert.ok(pkg.bugs?.url);
  assert.ok(pkg.homepage);
  assert.strictEqual(pkg.author, 'Roger Chappel');
});

test('LICENSE file exists and is included in files', () => {
  assert.ok(existsSync(join(pkgRoot, 'LICENSE')));
  const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'));
  assert.ok(pkg.files.includes('LICENSE'));
});
