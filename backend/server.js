const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const pool = require('./config/db');
require('dotenv').config();

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Маршруты
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);

// Маршрут для профиля
app.get('/api/profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Получаем данные текущего пользователя
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const user = userResult.rows[0];

    // Если пользователь с приоритетом 1 (администратор), получаем список пользователей с приоритетом 2
    let usersWithPosition = [];
    // Получаем пользователей с приоритетом 2 и отправляем полные данные
    if (user.priority === 1) {
      const usersQuery = 'SELECT id, login, position FROM users WHERE priority = 2';
      const usersResult = await pool.query(usersQuery);
      usersWithPosition = usersResult.rows;
    }


    res.json({ user, usersWithPosition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении профиля' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
