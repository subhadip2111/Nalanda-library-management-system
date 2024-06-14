const express = require('express');
const bodyParser = require('body-parser');

 const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);




module.exports = app;
