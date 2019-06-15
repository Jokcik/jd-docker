
FROM node
MAINTAINER jokcik;

WORKDIR "/home/jd-docker"

RUN npm i -g typescript@3.2.2
RUN npm i -g ts-node@7.0.1

# Install cron and supervisor
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install cron -yqq
RUN apt-get install supervisor -yqq

# Remove cron.* directories
RUN rm -Rf /etc/cron.daily
RUN rm -Rf /etc/cron.weekly
RUN rm -Rf /etc/cron.monthly
RUN rm -Rf /etc/cron.hourly

# Add the run script
CMD ["/home/jd-docker/docker/start.sh"]

