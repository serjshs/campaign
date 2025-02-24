FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d src/database/migrations.config.ts && npm run start:dev"]
