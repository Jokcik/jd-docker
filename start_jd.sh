#!/usr/bin/env bash

echo "start script"
/usr/bin/docker exec -it `/usr/bin/docker ps -q` ts-node index.ts --useTor
