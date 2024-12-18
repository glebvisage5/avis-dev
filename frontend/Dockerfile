# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY frontend/ ./

# Собираем приложение для продакшн
RUN npm run build

# Открываем порт для фронтенда (например, 5173)
EXPOSE 5173

# Запускаем сервер с командой dev, указываем, чтобы Vite слушал на всех интерфейсах
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
