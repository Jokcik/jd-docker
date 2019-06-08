#!/bin/bash

if [[ ! -d /home/jd-docker/node_modules/ ]]; then
    npm i
fi

while true; do sleep 1000; done
