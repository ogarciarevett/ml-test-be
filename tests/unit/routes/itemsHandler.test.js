require('rootpath')();
const { expect } = require('chai');
const sinon = require('sinon');
const HTTP_STATUSES = require('http-status-codes');
const ItemsValidator = require('app/routes/items/itemsValidator');
const ItemsHandler = require('app/routes/items/itemsHandler');
const ItemsController = require('app/routes/items/itemsController');
const mockItems = require('tests/mocks/items.json');

describe('ItemHandler Unit Test', () => {
  let sandbox;

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());

  describe('GET /api/items', () => {
    it('should find all items', async () => {
      const itemsValidatorSpy = sandbox.spy(ItemsValidator, 'validateSearch');
      const itemsValidatorControllerStub = sandbox.stub(ItemsController, 'getAll').resolves(mockItems);
      const req = {
        params: {},
        query: {
          search: 'iphone X'
        }
      };
      const res = {
        status: sandbox.stub().returns({
          json: sandbox.stub().resolves(mockItems)
        })
      };
      const nextSpy = sandbox.spy();

      try {
        await ItemsHandler.find(req, res, nextSpy);
      } catch (error) {
        return Promise.reject(error);
      }

      expect(nextSpy.notCalled).to.equal(true);
      expect(itemsValidatorSpy.calledOnceWith(req.query)).to.equal(true);
      expect(itemsValidatorControllerStub.calledOnce).to.equal(true);
      expect(res.status.calledOnce).to.equal(true);
      expect(res.status.calledWith(HTTP_STATUSES.OK)).to.equal(true);
      expect(res.status().json.calledWith(mockItems)).to.equal(true);
    });

    it('should call next with error thrown by the validator', async () => {
      const expected = new Error('something is not valid');
      const itemsValidatorStub = sandbox.stub(ItemsValidator, 'validateSearch').throws(expected);
      const itemsValidatorSpy = sandbox.spy(ItemsController, 'getAll');
      const req = {
        params: {},
        query: {}
      };
      const res = {
        status: sandbox.spy()
      };
      const nextSpy = sandbox.spy();
      try {
        await ItemsHandler.find(req, res, nextSpy);
        expect(true).to.equal(false);
      } catch (error) {
        expect(nextSpy.calledOnce).to.equal(true);
        expect(nextSpy.calledWith(expected)).to.equal(true);
        expect(itemsValidatorStub.calledOnce).to.equal(true);
        expect(itemsValidatorSpy.notCalled).to.equal(true);
        expect(res.status.notCalled).to.equal(true);
      }
    });

    it('should call next with error thrown by the controller', async () => {
      const expected = new Error('something is wrong');
      const itemsControllerStub = sandbox.stub(ItemsController, 'getAll').throws(expected);
      const req = {
        params: {},
        query: {}
      };
      const res = {
        status: sandbox.spy()
      };
      const nextSpy = sandbox.spy();
      try {
        await ItemsHandler.find(req, res, nextSpy);
        expect(true).to.equal(false);
      } catch (error) {
        expect(nextSpy.calledOnce).to.equal(true);
        expect(nextSpy.calledWith(expected)).to.equal(true);
        expect(itemsControllerStub.calledOnce).to.equal(true);
        expect(res.status.notCalled).to.equal(true);
      }
    });
  });
});
