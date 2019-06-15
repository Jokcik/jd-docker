#!/bin/bash

if [[ ! -d /home/jd-docker/node_modules/ ]]; then
    npm i
fi

cp ./crontab /etc/crontab
cp ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

apt-get install supervisor -yqq

# Prepend environemt variables to the crontab
env |cat - /etc/crontab > /tmp/crontab
mv /tmp/crontab /etc/crontab
/usr/bin/supervisord


while true; do sleep 1000; done
