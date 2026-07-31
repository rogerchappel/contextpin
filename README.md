# contextpin

Context pinning tool for developers. Capture and pin important context across your workflow.

## Status

This repository is early-stage. Confirm the current support, release, and security posture before using it in production.

## Install

`contextpin` is not currently published to npm. Clone this repository and
install its dependencies locally:

```sh
git clone https://github.com/rogerchappel/contextpin.git
cd contextpin
npm install
```

## Quickstart

From the repository root, run the local CLI entrypoint:

```sh
node src/index.js
node src/index.js --help
node src/index.js -h
node src/index.js --version
node src/index.js -v
```

The current CLI displays help when run without arguments and supports the
`--help`/`-h` and `--version`/`-v` options. Positional commands, unknown flags,
and extra arguments are not supported: they print a short usage diagnostic to
standard error and exit with a nonzero status. The pre-1.0 context pinning
workflow is still being defined; see [docs/PRD.md](docs/PRD.md) for the planned
product scope.

## Limitations

- The package does not yet persist, sync, or search pinned context.
- Treat command output as a release-readiness scaffold until the first supported
  workflow lands.
- Review the repository status and security policy before depending on it in
  production automation.

## Tests

```sh
npm test
```

## Verification

```bash
npm test              # Run tests
npm run package:smoke # Verify npm pack contents
npm run release:check # Full release checklist
```

## Development

Run the same checks maintainers use before opening a PR:

```sh
npm test
npm run build
npm run smoke
npm run package:smoke
npm run release:check
```

`npm run package:smoke` inspects the npm tarball and fails if the CLI entrypoint,
planned-scope docs, license, security policy, contribution guide, changelog, or
code of conduct would be missing from the published package.
## License

MIT
