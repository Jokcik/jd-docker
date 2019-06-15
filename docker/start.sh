#!/bin/bash

cp /home/jd-docker/crontab /etc/crontab
if [[ ! -d /home/jd-docker/node_modules/ ]]; then
    npm i
fi

while true; do sleep 1000; done
