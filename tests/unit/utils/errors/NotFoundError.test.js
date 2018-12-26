/* eslint-disable no-unused-expressions */

require('rootpath')();
const { expect } = require('chai');
const { NOT_FOUND } = require('http-status-codes');
const { NotFoundError } = require('app/utils/errors');

describe('NotFoundError Unit Tests', () => {
  describe('Constructor', () => {
    it('should have all properties well setted', () => {
      const instance = new NotFoundError();

      expect(instance).to.be.an.instanceOf(NotFoundError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.name).to.exist;
      expect(instance.status).to.exist;
      expect(instance.stack).to.exist;

      expect(instance.message).to.eq('');
      expect(instance.name).to.eq('NotFoundError');
      expect(instance.status).to.eq(NOT_FOUND);
      expect(instance.stack).to.be.a('string');
    });

    it('should have the same message as the one passed by parameter', () => {
      const errorMessage = 'The Error';
      const instance = new NotFoundError(errorMessage);

      expect(instance).to.be.an.instanceOf(NotFoundError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.message).to.be.a('string');
      expect(instance.message).to.eq(errorMessage);
    });

    it('should have the message passed as an string', () => {
      [
        1,
        '',
        true,
        Promise.resolve(true),
        () => {},
        [],
        {},
        null,
        NaN,
        undefined,
        Object.create({}, { property1: { value: 2, writable: true } })
      ].forEach(item => {
        const instance = new NotFoundError(item);

        expect(instance).to.be.an.instanceOf(NotFoundError);
        expect(instance).to.be.an.instanceOf(Error);

        expect(instance.message).to.exist;
        expect(instance.message).to.be.a('string');
      });
    });

    it('should extract the message when an Error is passed as message', () => {
      const errorMessage = 'The Error';
      const param = new Error(errorMessage);
      const instance = new NotFoundError(param);

      expect(instance).to.be.an.instanceOf(NotFoundError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.message).to.be.a('string');
      expect(instance.message).to.eq(errorMessage);
    });
  });

  describe('throw NotFoundError', () => {
    it('should be catchable', () => {
      const errorMessage = 'The Error';

      try {
        throw new NotFoundError(errorMessage);

        // eslint-disable-next-line no-unreachable
        expect(true).to.eq(false);
      } catch (error) {
        expect(error).to.be.an.instanceOf(NotFoundError);
        expect(error).to.be.an.instanceOf(Error);

        expect(error.message).to.exist;
        expect(error.name).to.exist;
        expect(error.status).to.exist;
        expect(error.stack).to.exist;

        expect(error.message).to.be.a('string');
        expect(error.message).to.eq(errorMessage);
        expect(error.name).to.eq('NotFoundError');
        expect(error.status).to.eq(NOT_FOUND);
        expect(error.stack).to.be.a('string');
      }
    });
  });
});
