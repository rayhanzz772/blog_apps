require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const sequelize = require('./config/database');
const db = require('./models');
const { createDefault } = require('./services/server');

// routes
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category')
const tagRoutes = require('./routes/tag')
const postActivityRoutes = require('./routes/postActivity');

// log routes
const logRoutes = require('./routes/logs');

createDefault.existinguser

// middleware json
app.use(express.json());

// Root route
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/tags', tagRoutes);
app.use('/post-activities', postActivityRoutes);

// log route
app.use('/logs', logRoutes)

// Running server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

// Sinkronisasi apus
// sequelize.sync({ force: true });

// skinronisasi 2
db.sequelize.sync().then(() => {
  console.log('Database & tabel sinkron!');
  createDefault();
});
