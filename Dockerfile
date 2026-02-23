FROM node:20-alpine

RUN groupadd --system appgroup && useradd --system --ingroup appgroup appuser

WORKDIR /app

COPY package*.json ./

Run npm ci --omit=dev

COPY . .

RUN chown -R appuser:appgroup /app 

USER appuser

EXPOSE 3000

CMD ["node", "crud-rsds-mysql-nodejs.js"]
