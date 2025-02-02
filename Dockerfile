# Establece la imagen base
FROM node:20.10.0

COPY [".","/usr/src"]

WORKDIR /usr/src

RUN npm install

RUN npm run build

ENV NEW_RELIC_NO_CONFIG_FILE=true

CMD ["npm", "start"]