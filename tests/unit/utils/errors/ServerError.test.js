/* eslint-disable no-unused-expressions */
require('rootpath')();
const { expect } = require('chai');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { ServerError } = require('app/utils/errors');

describe('ServerError Unit Tests', () => {
  describe('Constructor', () => {
    it('should have all properties well setted', () => {
      const instance = new ServerError();

      expect(instance).to.be.an.instanceOf(ServerError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.name).to.exist;
      expect(instance.status).to.exist;
      expect(instance.stack).to.exist;

      expect(instance.message).to.eq('');
      expect(instance.name).to.eq('ServerError');
      expect(instance.status).to.eq(INTERNAL_SERVER_ERROR);
      expect(instance.stack).to.be.a('string');
    });

    it('should have the same message as the one passed by parameter', () => {
      const errorMessage = 'The Error';
      const instance = new ServerError(errorMessage);

      expect(instance).to.be.an.instanceOf(ServerError);
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
        const instance = new ServerError(item);

        expect(instance).to.be.an.instanceOf(ServerError);
        expect(instance).to.be.an.instanceOf(Error);

        expect(instance.message).to.exist;
        expect(instance.message).to.be.a('string');
      });
    });

    it('should extract the message when an Error is passed as message', () => {
      const errorMessage = 'The Error';
      const param = new Error(errorMessage);
      const instance = new ServerError(param);

      expect(instance).to.be.an.instanceOf(ServerError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.message).to.be.a('string');
      expect(instance.message).to.eq(errorMessage);
    });
  });

  describe('throw ServerError', () => {
    it('should be catchable', () => {
      const errorMessage = 'The Error';

      try {
        throw new ServerError(errorMessage);

        // eslint-disable-next-line no-unreachable
        expect(true).to.eq(false);
      } catch (error) {
        expect(error).to.be.an.instanceOf(ServerError);
        expect(error).to.be.an.instanceOf(Error);

        expect(error.message).to.exist;
        expect(error.name).to.exist;
        expect(error.status).to.exist;
        expect(error.stack).to.exist;

        expect(error.message).to.be.a('string');
        expect(error.message).to.eq(errorMessage);
        expect(error.name).to.eq('ServerError');
        expect(error.status).to.eq(INTERNAL_SERVER_ERROR);
        expect(error.stack).to.be.a('string');
      }
    });
  });
});
