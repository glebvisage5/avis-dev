const express = require('express');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const user = userResult.rows[0];

    let usersWithPosition = [];
    if (user.priority === 1) {
      const usersQuery = 'SELECT id, login, position FROM users WHERE priority = 2';
      const usersResult = await pool.query(usersQuery);
      usersWithPosition = usersResult.rows;
    }

    res.json({ user, usersWithPosition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
});

module.exports = router;
