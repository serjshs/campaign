FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx typeorm migration:run -d dist/database/migrations.config.js && npm run start:prod"]
