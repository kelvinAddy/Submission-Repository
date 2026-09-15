const logger = require('./App/Utils/logger');
const connectToDb = require('./App/Utils/db');
const app = require('./App/app');

connectToDb()
  .then(() => logger.info('Connected to Database'))
  .catch((error) => logger.error('Error was encountered', error.message));
