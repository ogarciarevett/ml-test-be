const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const ServerError = require('./ServerError');

module.exports = {
  BadRequestError,
  NotFoundError,
  ServerError,
  UnauthorizedError
};
