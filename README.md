# contextpin

Context pinning tool for developers. Capture and pin important context across your workflow.

## Status

This repository is early-stage. Confirm the current support, release, and security posture before using it in production.

## Install

```sh
npm install
```

## Quickstart

```sh
npx contextpin --help
npx contextpin --version
```

The current CLI intentionally exposes only `--help` and `--version` while the
pre-1.0 context pinning workflow is being defined. See [docs/PRD.md](docs/PRD.md)
for the planned product scope.

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
