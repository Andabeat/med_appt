FROM node:14

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm install

COPY server ./

EXPOSE 8181

CMD ["node", "index.js"]
