#!/bin/bash

set -e

cd `dirname $0`
cd ..

echo
echo ">>> Installing dependencies <<<"
echo

yarn

echo
echo ">>> Running unit tests <<<"
echo

CI=true yarn test

echo
echo ">>> Checking formatting <<<"
echo

yarn run check-formatting

echo
echo ">>> Creating a build <<<"
echo

yarn run build
