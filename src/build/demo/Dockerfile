FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Команда для запуску міграцій та старту додатку
CMD ["sh", "-c", "npm run typeorm migration:run && npm run start:prod"]
