FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN chown -R node:node /app 

USER node

EXPOSE 3000

CMD ["node", "crud-rds-mysql-nodejs.js"]
