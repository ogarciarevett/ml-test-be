require('rootpath')();
const debug = require('debug')('mlgateway:itemsHandler');
const HTTP_STATUSES = require('http-status-codes');
const devConsole = require('app/utils/devConsole');
const { NotFoundError } = require('app/utils/errors');
const ItemsController = require('./itemsController');
const ItemsValidator = require('./itemsValidator');

class ItemsHandler {
  static async find(req, res, next) {
    try {
      const { query } = req;
      await ItemsValidator.validateSearch(query);
      const result = await ItemsController.getAll(query.search);
      if (!result.items.length) throw new NotFoundError('No items found');

      res.status(HTTP_STATUSES.OK).json(result);
    } catch (error) {
      debug(`${devConsole.error(error)}`);
      debug(`${devConsole.error('Error getting all the items')}`);
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const { params } = req;
      await ItemsValidator.validateIdParam(params);
      const item = await ItemsController.getID(params.id);
      res.status(HTTP_STATUSES.OK).json(item);
    } catch (err) {
      debug(`${devConsole.error(`Error getting the item with the id: ${req.params.id}`)}`);
      next(err.response.data);
    }
  }
}

module.exports = ItemsHandler;
