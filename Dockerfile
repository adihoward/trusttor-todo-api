FROM node:current-slim

WORKDIR /app

EXPOSE 8080

COPY .env .

COPY package.json .

COPY tsconfig.json .

COPY src /app/src

RUN npm install

RUN npm run build

CMD ["node", "built/index.js"]
