#!/bin/bash

if [[ ! -d /home/jd-docker/node_modules/ ]]; then
    npm i
fi

service tor start
cp ./torrc /etc/tor/torrc

while true; do sleep 1000; done
