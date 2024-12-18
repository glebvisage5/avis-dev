const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все поля.' });
  }

  try {
    const getUserQuery = 'SELECT * FROM users WHERE login = $1';
    const userResult = await pool.query(getUserQuery, [login]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Неверный логин или пароль.' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный логин или пароль.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Авторизация успешна!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при авторизации.' });
  }
});

module.exports = router;
