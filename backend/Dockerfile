# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY backend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY backend/ .

# Убедимся, что .env файл доступен
COPY backend/.env .env

# Устанавливаем переменные среды
ENV NODE_ENV=production

# Открываем порт приложения (5000)
EXPOSE 5000

# Запускаем сервер
CMD ["npm", "start"]
