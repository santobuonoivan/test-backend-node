const express = require('express');
const morgan = require('morgan');
//const cors = require('./Auth/cors'); TODO modificar cors manual
const cors = require('cors');
const env = require('dotenv').config();
//const authMiddleware = require('./middleware/auth');
//const authorization = require('./middleware/authorization');
//Settings
const port = process.env.NODE_PORT || 3000;
const app = express();
const db = require('./components/db/db.mariadb.config');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
//app.use(express.static('./public'));

// Routes

const authRouter = require('./Auth/AuthRoutes');
const userRouter = require('./users/routes/UserRoutes');
const dataRouter = require('./components/data/router/data');
const filesRouter = require('./components/files/router/files');

app.use('/users', userRouter);
app.use('/login', authRouter);
app.use('/data', dataRouter);
app.use('/files', filesRouter);

app.listen(port, function () {
    console.log(`application up and running on port: ${port}`);
});