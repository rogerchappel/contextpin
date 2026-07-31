import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
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

test('package allowlist includes CLI support documentation and fixtures', () => {
  const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'));

  assert.ok(pkg.files.includes('docs'));
  assert.ok(pkg.files.includes('fixtures'));
  assert.ok(existsSync(join(pkgRoot, 'docs/PRD.md')));
  assert.ok(existsSync(join(pkgRoot, 'fixtures/cli/help.txt')));
});

test('README quickstart uses the unpublished local CLI entrypoint', () => {
  const readme = readFileSync(join(pkgRoot, 'README.md'), 'utf8');

  assert.match(readme, /not (?:currently )?published to npm/i);
  assert.match(readme, /git clone https:\/\/github\.com\/rogerchappel\/contextpin\.git/);
  assert.match(readme, /node src\/index\.js --help/);
  assert.match(readme, /node src\/index\.js --version/);
  assert.doesNotMatch(readme, /\bnpx\s+contextpin\b/);
});

test('CLI help output matches the release fixture for supported invocations', () => {
  const expected = readFileSync(join(pkgRoot, 'fixtures/cli/help.txt'), 'utf8');

  for (const args of [[], ['--help'], ['-h']]) {
    const result = spawnSync(process.execPath, [join(pkgRoot, 'src/index.js'), ...args], {
      cwd: pkgRoot,
      encoding: 'utf8',
    });

    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stderr, '');
    assert.strictEqual(result.stdout, expected);
  }
});

test('CLI version output matches package metadata and fixture for supported flags', () => {
  const expected = readFileSync(join(pkgRoot, 'fixtures/cli/version.txt'), 'utf8');
  const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'));

  for (const arg of ['--version', '-v']) {
    const result = spawnSync(process.execPath, [join(pkgRoot, 'src/index.js'), arg], {
      cwd: pkgRoot,
      encoding: 'utf8',
    });

    assert.strictEqual(result.status, 0);
    assert.strictEqual(result.stderr, '');
    assert.strictEqual(result.stdout, expected);
  }
  assert.strictEqual(expected.trim(), pkg.version);
});

test('CLI rejects unsupported positional commands and flags', () => {
  for (const arg of ['bogus', '--wat']) {
    const result = spawnSync(process.execPath, [join(pkgRoot, 'src/index.js'), arg], {
      cwd: pkgRoot,
      encoding: 'utf8',
    });

    assert.strictEqual(result.status, 1);
    assert.strictEqual(result.stdout, '');
    assert.match(result.stderr, new RegExp(`^Unsupported argument: ${arg}\\n`));
    assert.match(result.stderr, /Run contextpin --help for usage\.\n$/);
  }
});

test('CLI rejects extra arguments after a supported option', () => {
  const result = spawnSync(
    process.execPath,
    [join(pkgRoot, 'src/index.js'), '--help', 'extra'],
    { cwd: pkgRoot, encoding: 'utf8' },
  );

  assert.strictEqual(result.status, 1);
  assert.strictEqual(result.stdout, '');
  assert.strictEqual(
    result.stderr,
    'Unsupported arguments: --help extra\nRun contextpin --help for usage.\n',
  );
});
