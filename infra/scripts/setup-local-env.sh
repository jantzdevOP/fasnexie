#!/usr/bin/env bash
set -euo pipefail

cp -n /home/runner/work/fasnexie/fasnexie/.env.example /home/runner/work/fasnexie/fasnexie/.env.local || true
cd /home/runner/work/fasnexie/fasnexie
pnpm install
pnpm --filter @fasnexi/api db:migrate || true
echo "Local FasNexi environment is ready."
