const express = require('express');
const middleware = require('../App/Middlewares/middleware');
const connectToDb = require('../App/Utils/db');
const blogRouter = require('../App/Routes/blog.router');
const userRouter = require('./Routes/user.router');
const loginRouter = require('./Routes/login.router');

const app = express();

process.env.NODE_ENV === 'test' && connectToDb();

app.use(express.json());
app.use(middleware.getToken);
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
