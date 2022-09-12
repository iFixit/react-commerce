#!/bin/bash -e

file_to_patch="node_modules/react-instantsearch-hooks-server/dist/es/getServerState.js"

if grep -E 'modules.*react-dom.server' "$file_to_patch" >/dev/null; then
   patch "$file_to_patch" < ./react-instantsearch-hooks-server.patch
fi
