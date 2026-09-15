const logger = require('../Utils/logger');

const requestLogger = (req, res, next) => {
  logger.info('METHOD :', req.method);
  logger.info('PATH :', req.path);
  logger.info('BODY :', req.body);
  logger.info('----');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Unknown Endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.message === 'CastError') {
    res.status(500).json({ error: 'Malformed Id' });
  } else if (error.message === 'ValidationError') {
    res.status(400).json(error);
  }
  next(error);
};

module.exports = { unknownEndpoint, errorHandler, requestLogger };
