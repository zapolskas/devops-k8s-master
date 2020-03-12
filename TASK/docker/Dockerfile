FROM node:8.16.1-alpine

WORKDIR /usr/src/app

COPY ./src/app.js ./
COPY ./src/package*.json ./

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
