
FROM node
MAINTAINER jokcik;

WORKDIR "/home/jd-docker"

RUN npm i -g typescript@3.2.2
RUN npm i -g ts-node@7.0.1

RUN apt-get clean && apt-get update && apt-get install -y cron
cp ./crontab /etc/crontab

CMD ["/home/jd-docker/docker/start.sh"]

