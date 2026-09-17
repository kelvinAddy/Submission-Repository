const express = require('express');
const middleware = require('../App/Middlewares/middleware');
const blogRouter = require('../App/Routes/blog.router');
const connectToDb = require('../App/Utils/db');

const app = express();

process.env.NODE_ENV === 'test' && connectToDb();

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
