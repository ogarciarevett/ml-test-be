require('rootpath')();
const { expect } = require('chai');
const sinon = require('sinon');
const ItemsValidator = require('app/routes/items/itemsValidator');
const { BadRequestError } = require('app/utils/errors');

describe('ItemsValidator Unit Test', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  describe('validateIdParam method', () => {
    const badDataIdParam = [{ id: [] }, { id: NaN }, { id: Infinity }, { id: {} }, { id: -10 }];
    const goodDataIdParam = [{ id: 'skldjfnwj4sdkjfn113a' }, { id: 'ad' }];

    badDataIdParam.forEach(data => {
      it(`should throw an error because the schema { id: ${data.id} } is not supported`, async () => {
        const itemsValidatorSpy = sandbox.spy(ItemsValidator, 'validateIdParam');

        try {
          await ItemsValidator.validateIdParam(data);
          expect(false).to.equal(true);
        } catch (error) {
          const tempError = new BadRequestError();
          expect(error).to.be.instanceOf(BadRequestError);
          expect(error.defaultMessage).to.eq(tempError.defaultMessage);
          expect(itemsValidatorSpy.calledOnce).to.equal(true);
          expect(itemsValidatorSpy.lastCall.args[0]).to.deep.eq(data);
        }
      });
    });

    goodDataIdParam.forEach(data => {
      it(`should return true if the schema { id: ${data.id} } is ok`, async () => {
        const itemsValidatorSpy = sandbox.spy(ItemsValidator, 'validateIdParam');

        try {
          const result = await ItemsValidator.validateIdParam(data);
          expect(result).to.equal(true);
          expect(itemsValidatorSpy.calledOnce).to.equal(true);
          expect(itemsValidatorSpy.lastCall.args[0]).to.deep.eq(data);
        } catch (error) {
          return Promise.reject(error);
        }
      });
    });
  });

  describe('validateSearch method', () => {
    const badDataIdParam = [{ search: [] }, { search: NaN }, { search: Infinity }, { search: {} }, { search: -10 }];
    const goodDataIdParam = [{ search: 'iphone X' }, { search: 'motorola' }];

    badDataIdParam.forEach(data => {
      it(`should throw an error because the schema { search: ${data.search} } is not supported`, async () => {
        const itemsValidatorSpy = sandbox.spy(ItemsValidator, 'validateSearch');

        try {
          await ItemsValidator.validateSearch(data);
          expect(false).to.equal(true);
        } catch (error) {
          console.log(JSON.stringify(error), 'HOLA');
          const tempError = new BadRequestError();
          expect(error).to.be.instanceOf(BadRequestError);
          expect(error.defaultMessage).to.eq(tempError.defaultMessage);
          expect(itemsValidatorSpy.calledOnce).to.equal(true);
          expect(itemsValidatorSpy.lastCall.args[0]).to.deep.eq(data);
        }
      });
    });

    goodDataIdParam.forEach(data => {
      it(`should return true if the schema { search: ${data.search} is ok`, async () => {
        const itemsValidatorSpy = sandbox.spy(ItemsValidator, 'validateSearch');

        try {
          const result = await ItemsValidator.validateSearch(data);
          expect(result).to.equal(true);
          expect(itemsValidatorSpy.calledOnce).to.equal(true);
          expect(itemsValidatorSpy.lastCall.args[0]).to.deep.eq(data);
        } catch (error) {
          return Promise.reject(error);
        }
      });
    });
  });
});
