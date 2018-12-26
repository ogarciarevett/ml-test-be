const debug = require('debug')('mlgateway:itemsController');
const axios = require('axios');
const devConsole = require('app/utils/devConsole');
const baseURL = require('config').get('mlAPI.baseURL');
const author = require('config').get('mlAPI.defaultAuthor');
const { totalItemsBySearch } = require('config').get('mlAPI.testLimits');
const Item = require('app/resources/item');

class ItemController {
  static async getAll(query) {
    try {
      const responseML = await axios.get(`${baseURL}/sites/MLA/search?q=${query}`);
      debug(`${devConsole.success(`mercadolibre success request to /sites/MLA/search?q=${query}`)}`);
      const responseTest = responseML.data.results.slice(0, totalItemsBySearch);
      const categories = responseTest.map(x => x.category_id);
      const items = responseTest.map(data => {
        const item = new Item(data);
        delete item.sold_quantity;
        delete item.description;
        delete item.permalink;
        return item;
      });
      const response = { author, categories, items };
      return response;
    } catch (error) {
      debug(`${devConsole.error(error)}`);
      return Promise.reject(error);
    }
  }

  static async getID(id) {
    try {
      const responseItemML = await axios.get(`${baseURL}/items/${id}`);
      const responseItemMLDesc = await axios.get(`${baseURL}/items/${id}/description`);
      debug(`${devConsole.success(`mercadolibre success request to /items/${id} and /description`)}`);
      const itemResponse = new Item({
        ...responseItemML.data,
        description: responseItemMLDesc.data.plain_text || responseItemMLDesc.data.text || 'Sin descripción',
        idPicture: responseItemML.data.pictures[0].secure_url
      });
      return itemResponse;
    } catch (error) {
      debug(`${devConsole.error(error)}`);
      return Promise.reject(error);
    }
  }
}

module.exports = ItemController;
