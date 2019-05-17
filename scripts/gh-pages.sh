#!/bin/bash

set -e

if [ ! -d '.git' ]; then
    echo >&2 'error: scripts/gh-pages.sh must be run from repository root'
    exit 1
fi

rm -rf ./tmp

(cd ./pkg/web && npm install && npm run build)

hash="$(git rev-parse HEAD)"

cp -R ./pkg/web/dist ./tmp
git checkout gh-pages
cp -R ./tmp/* ./
git add .
git commit -m "Imported from ${hash}"
rm -rf ./tmp
