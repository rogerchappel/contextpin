# PRD: contextpin

Status: in-progress
Decision: build now
Factory run: 2026-05-29 PM

## Pitch

`contextpin` creates repo-local context pins for coding agents: short, reviewable JSON records of facts, decisions, commands, and files that should survive between sessions without becoming a private data dump. 📌

## Source Attribution

Inspired by current local-first agent continuity tools such as Kage, Agentpack, Agent Bus MCP, CodeTrellis, and AICTX discussions. This project is a narrower deterministic pin file manager focused on explicit human-reviewable records.

## Problem

Agents waste context rediscovering known facts, but broad memory systems can become noisy or unsafe. Developers need tiny repo-local pins with expiry, scopes, source files, and redaction.

## V1 Scope

- TypeScript CLI package.
- `contextpin init`, `contextpin add`, `contextpin list`, `contextpin render`, and `contextpin prune`.
- Store pins under `.contextpin/pins/*.json`.
- Validate fields: title, body, scope, source, tags, createdAt, expiresAt, sensitivity.
- Redact home paths and common secrets in rendered output.
- Emit Markdown bundles for agent handoff prompts.
- Fixture-backed tests and sample pins.

## Out of Scope

- Vector search or embeddings.
- MCP server mode.
- Background daemons or sync.

## Verification

Run `npm test`, `npm run check`, `npm run build`, `npm run smoke`, `bash scripts/validate.sh`, and an end-to-end add/list/render/prune smoke.

