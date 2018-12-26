const ItemsHandler = require('./itemsHandler');

module.exports = (app, express) => {
    const api = express.Router();

    /**
     * @swagger
     * definitions:
     *  author:
     *      type: object
     *      properties:
     *          name:
     *              type: string
     *          lastName:
     *              type: string
     *  Item:
     *      type: object
     *      properties:
     *          id:
     *              type: string
     *          title:
     *              type: string
     *          price:
     *              type: object
     *              properties:
     *                  currency:
     *                      type: string
     *                  amount:
     *                      type: number
     *                  decimals:
     *                      type: number
     *          picture:
     *              type: string
     *          condition:
     *              type: string
     *          free_shipping:
     *              type: boolean
     *          sold_quantity:
     *              type: number
     *          description:
     *              type: string
     *  allItemsResponse:
     *      type: object
     *      properties:
     *          author:
     *              schema:
     *                  $ref: '#/definitions/author'
     *          categories:
     *              type: array
     *              items:
     *                  type: string
     *          items:
     *              type: array
     *              items:
     *                  schema:
     *                      $ref: '#/definitions/Item'
     *  itemResponse:
     *      type: object
     *      properties:
     *          author:
     *              schema:
     *                  #ref: '#/definitions/author'
     *          item:
     *              schema:
     *                  #ref: '#/definitions/Item'
     */

    /**
     * @swagger
     * /api/items:
     *  get:
     *    description: Retrives existent items
     *    operationId: 'findItem'
     *    security:
     *      - Bearer: []
     *    consumes:
     *       - application/json
     *    responses:
     *      200:
     *        description: Object containing an array of items paginated
     *        content:
     *          application/json:
     *        schema:
     *          $ref: '#/definitions/allItemsResponse'
     *      400:
     *        description: Failed to retrieve items
     *        content:
     *          application/json:
     *      500:
     *        description: Failed to retrieve items
     *        content:
     *          application/json:
     *    tags:
     *      - allItemsResponse
     */
    api.get('/', ItemsHandler.find);

    /**
     * @swagger
     * /api/items/:id:
     *  get:
     *    description: Retrives only one item by id
     *    operationId: 'findById'
     *    security:
     *      - Bearer: []
     *    consumes:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: param
     *        required: true
     *        type: string
     *        description: Item ID to be searched
     *    responses:
     *      200:
     *        description: Item object
     *        content:
     *          application/json:
     *        schema:
     *          $ref: '#/definitions/itemResponse'
     *      400:
     *        description: Failed to retrieve item
     *        content:
     *          text/html:
     *      404:
     *         description: Item not found
     *      500:
     *        description: Failed to retrieve Item
     *        content:
     *          text/html:
     *    tags:
     *      - Items
     */

    api.get('/:id', ItemsHandler.findById);

    app.use('/api/items', api);
};
