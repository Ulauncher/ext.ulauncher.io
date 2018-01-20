#!/bin/bash

cd `dirname $0`
cd ..

docker run \
    --rm \
    -it \
    -v $(pwd):/root/ulauncher \
    -v $HOME/.bash_history:/root/.bash_history \
    -p 3001:3001 \
    --name ext-ulauncher-io \
    node:8-alpine \
    sh
