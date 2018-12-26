/* eslint-disable no-unused-expressions */

require('rootpath')();
const { expect } = require('chai');
const { UNAUTHORIZED } = require('http-status-codes');
const { UnauthorizedError } = require('app/utils/errors');

describe('UnauthorizedError Unit Tests', () => {
  describe('Constructor', () => {
    it('should have all properties well setted', () => {
      const instance = new UnauthorizedError();

      expect(instance).to.be.an.instanceOf(UnauthorizedError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.name).to.exist;
      expect(instance.status).to.exist;
      expect(instance.stack).to.exist;

      expect(instance.message).to.eq('');
      expect(instance.name).to.eq('UnauthorizedError');
      expect(instance.status).to.eq(UNAUTHORIZED);
      expect(instance.stack).to.be.a('string');
    });

    it('should have the same message as the one passed by parameter', () => {
      const errorMessage = 'The Error';
      const instance = new UnauthorizedError(errorMessage);

      expect(instance).to.be.an.instanceOf(UnauthorizedError);
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
        const instance = new UnauthorizedError(item);

        expect(instance).to.be.an.instanceOf(UnauthorizedError);
        expect(instance).to.be.an.instanceOf(Error);

        expect(instance.message).to.exist;
        expect(instance.message).to.be.a('string');
      });
    });

    it('should extract the message when an Error is passed as message', () => {
      const errorMessage = 'The Error';
      const param = new Error(errorMessage);
      const instance = new UnauthorizedError(param);

      expect(instance).to.be.an.instanceOf(UnauthorizedError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.message).to.be.a('string');
      expect(instance.message).to.eq(errorMessage);
    });
  });

  describe('throw UnauthorizedError', () => {
    it('should be catchable', () => {
      const errorMessage = 'The Error';

      try {
        throw new UnauthorizedError(errorMessage);

        // eslint-disable-next-line no-unreachable
        expect(true).to.eq(false);
      } catch (error) {
        expect(error).to.be.an.instanceOf(UnauthorizedError);
        expect(error).to.be.an.instanceOf(Error);

        expect(error.message).to.exist;
        expect(error.name).to.exist;
        expect(error.status).to.exist;
        expect(error.stack).to.exist;

        expect(error.message).to.be.a('string');
        expect(error.message).to.eq(errorMessage);
        expect(error.name).to.eq('UnauthorizedError');
        expect(error.status).to.eq(UNAUTHORIZED);
        expect(error.stack).to.be.a('string');
      }
    });
  });
});
