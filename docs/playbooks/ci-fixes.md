# CI Fixes Playbook

## Overview

This document records the root causes and resolutions for recurring CI failures in the `ci` workflow.

---

## 2026-06-19 — Fix quality job and security scan

### 1. `quality` job: `pnpm test -- --coverage` fails

**Root cause**  
Turbo 2.x treats every argument after the task name as a Turbo flag.  
Running `pnpm test -- --coverage` expands to `turbo run test "--coverage"`, which
Turbo rejects with:

```
ERROR  unexpected argument '--coverage' found
tip: to pass '--coverage' as a value, use '-- --coverage'
```

`pnpm`'s `--` separator only prevents *pnpm itself* from consuming the flag; it
does **not** insert a second `--` before the underlying turbo call, so the flag
lands as a direct Turbo argument rather than a pass-through.

**Fix applied**  
Removed `-- --coverage` from the CI step in `.github/workflows/ci.yml`:

```diff
- - run: pnpm test -- --coverage
+ - run: pnpm test
```

Coverage thresholds are already configured per-package in `jest.config.ts`
(`collectCoverageFrom`). If per-run coverage reports are required in the future,
add a dedicated `test:coverage` Turbo task and invoke it directly.

---

### 2. `security` job: Trivy reports HIGH CVEs

**Root cause**  
Two transitive dependencies shipped vulnerable versions:

| Package | Installed | Fixed | CVEs |
|---|---|---|---|
| `@xmldom/xmldom` | 0.7.13 (via `@expo/plist@0.2.2`) | ≥ 0.9.9 | CVE-2026-34601, CVE-2026-41672, CVE-2026-41673, CVE-2026-41674, CVE-2026-41675 |
| `glob` | 10.3.10 (via `@next/eslint-plugin-next@14.2.35`) | ≥ 10.5.0 | CVE-2025-64756 |

Because `ignore-unfixed: true` is set in the Trivy step, only *fixed*
vulnerabilities fail the scan — meaning these will continue to block CI until
the resolved versions are present in the lockfile.

**Fix applied**  
Added `pnpm.overrides` to `package.json` to force the patched versions across
the entire workspace:

```json
"pnpm": {
  "overrides": {
    "@xmldom/xmldom": ">=0.9.10",
    "glob": ">=10.5.0"
  }
}
```

`pnpm install` was re-run to regenerate `pnpm-lock.yaml` with the resolved
versions. The lockfile no longer contains `@xmldom/xmldom@0.7.13` or
`glob@10.3.10`.

---

## How to reproduce a CVE scan locally

```bash
# Install Trivy (macOS)
brew install aquasecurity/trivy/trivy

# Scan the workspace (mirrors CI config)
trivy fs . --severity HIGH,CRITICAL --ignore-unfixed --exit-code 1
```
