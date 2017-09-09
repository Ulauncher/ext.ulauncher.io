#!/bin/bash

cd `dirname $0`
cd ..

docker run \
    --rm \
    -v $(pwd):/root/ulauncher \
    node:6 \
    bash -c "cd /root/ulauncher && yarn build"
