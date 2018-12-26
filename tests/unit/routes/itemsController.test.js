require('rootpath')();
const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const ItemsController = require('app/routes/items/itemsController');
const Item = require('app/resources/item');
const mockItems = require('tests/mocks/items.json');
const mockItem = require('tests/mocks/item.json');
const { NotFoundError } = require('app/utils/errors');

describe('ItemsController Unit Test', () => {
  let sandbox;

  before(() => (sandbox = sinon.createSandbox()));

  describe('Get Item by ID', () => {
    afterEach(() => sandbox.restore());
    it('should fetch correctly', async () => {
      const itemsControllerStub = sandbox.stub(ItemsController, 'getID').returns(mockItem);
      const result = await ItemsController.getID(mockItem.id);
      expect(result).to.deep.equal(mockItem);
      expect(itemsControllerStub.calledOnceWith(mockItem.id)).to.equal(true);
    });
  });

  describe('Get All', () => {
    afterEach(() => sandbox.restore());

    it('should fetch all correctly', async () => {
      const itemsControllerStub = sandbox.stub(ItemsController, 'getAll').returns(mockItems);
      const result = await ItemsController.getAll();
      expect(itemsControllerStub.calledOnce).to.equal(true);
      expect(result).to.deep.equal(mockItems);
    });
  });
});
