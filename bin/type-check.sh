#!/bin/bash
set -eo pipefail

TSC_OPTS="--pretty --noEmit"

function echo_target () { echo "🔍 Checking $1"; }

echo_target "frontend/"
pnpm tsc --project "frontend/tsconfig.json" $TSC_OPTS

echo_target "backend/"
pnpm tsc --project "backend/tsconfig.json" $TSC_OPTS

for dir in packages/*/; do
   if [ -f "${dir}tsconfig.json" ]; then
      echo_target "${dir}"
      pnpm tsc --project "${dir}tsconfig.json" $TSC_OPTS
   fi
done
