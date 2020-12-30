FROM node:10

USER node

WORKDIR /opt/football-data-app

EXPOSE 3001
CMD [ "tail -f", "/dev/null" ]
