require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');

app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.use(authRoutes);
app.use(employeeRoutes);

mongoose.connect(process.env.MONGO_DB_URL)
    .then(result => {
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    });