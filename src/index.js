#!/usr/bin/env node

const help = `contextpin

Early-stage local-first developer tool scaffold.

Usage:
  contextpin --help
  contextpin --version

The implementation is intentionally minimal while the project is pre-1.0.
See docs/PRD.md for planned scope.`;

const version = "0.1.0";
const args = process.argv.slice(2);
const [arg] = args;

if (args.length === 0 || (args.length === 1 && (arg === "--help" || arg === "-h"))) {
  console.log(help);
} else if (args.length === 1 && (arg === "--version" || arg === "-v")) {
  console.log(version);
} else {
  const label = args.length === 1 ? "argument" : "arguments";
  console.error(`Unsupported ${label}: ${args.join(" ")}`);
  console.error("Run contextpin --help for usage.");
  process.exitCode = 1;
}
