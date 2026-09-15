const express = require('express');
const middleware = require('../App/Middlewares/middleware');
const blogRouter = require('../App/Routes/blog.router');

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
