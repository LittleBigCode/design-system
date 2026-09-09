#!/usr/bin/env bash
#
# Verify HEAD would publish cleanly, in a clean clone with only the root
# installed — the condition publish-npm.yml actually runs under.
#
# This exists because `npm run check` in the working tree is NOT a valid
# predictor: site/'s own `file:..` install leaves a pnpm link at
# site/node_modules/@diametral/design-system that tsc walks up and finds, so
# build:docs resolves subpath imports locally that CI cannot resolve at all.
# Two consecutive 5.0.0-beta publishes failed on exactly that blind spot.
#
# Usage: scripts/preflight-publish.sh [ref]   (default: HEAD)

set -euo pipefail

REF="${1:-HEAD}"
REPO_ROOT="$(git rev-parse --show-toplevel)"
SHA="$(git -C "$REPO_ROOT" rev-parse "$REF")"
VERSION="$(node -p "require('$REPO_ROOT/package.json').version")"
case "$VERSION" in
  *-*) DIST_TAG=next ;;
  *)   DIST_TAG=latest ;;
esac

echo "preflight: $VERSION @ ${SHA:0:7} -> dist-tag '$DIST_TAG'"

# The tag must point at a commit the remote has, or the workflow checks out
# something that doesn't exist.
if ! git -C "$REPO_ROOT" merge-base --is-ancestor "$SHA" "@{u}" 2>/dev/null; then
  echo "preflight: FAIL — $REF is not on the upstream branch. Push first." >&2
  exit 1
fi

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git clone --quiet --no-local "$REPO_ROOT" "$WORK/repo"
git -C "$WORK/repo" checkout --quiet "$SHA"

cd "$WORK/repo"
npm ci --silent || npm i --silent
npm run build
node scripts/check-contracts.mjs
npm publish --dry-run --tag "$DIST_TAG" > "$WORK/dry.log" 2>&1
grep -E 'notice (name|version|total files|package size)' "$WORK/dry.log"

echo "preflight: OK — tag v$VERSION at ${SHA:0:7}, publishes to '$DIST_TAG'"
