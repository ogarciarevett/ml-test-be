/* eslint-disable no-unused-expressions */

require('rootpath')();
const { expect } = require('chai');
const { BAD_REQUEST } = require('http-status-codes');
const { BadRequestError } = require('app/utils/errors');

describe('BadRequestError Unit Tests', () => {
  describe('Constructor', () => {
    it('should have all properties well setted', () => {
      const instance = new BadRequestError();

      expect(instance).to.be.an.instanceOf(BadRequestError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.name).to.exist;
      expect(instance.status).to.exist;
      expect(instance.stack).to.exist;

      expect(instance.message).to.eq('');
      expect(instance.name).to.eq('BadRequestError');
      expect(instance.status).to.eq(BAD_REQUEST);
      expect(instance.stack).to.be.a('string');
    });

    it('should have the same message as the one passed by parameter', () => {
      const errorMessage = 'The Error';
      const instance = new BadRequestError(errorMessage);

      expect(instance).to.be.an.instanceOf(BadRequestError);
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
        const instance = new BadRequestError(item);

        expect(instance).to.be.an.instanceOf(BadRequestError);
        expect(instance).to.be.an.instanceOf(Error);

        expect(instance.message).to.exist;
        expect(instance.message).to.be.a('string');
      });
    });

    it('should extract the message when an Error is passed as message', () => {
      const errorMessage = 'The Error';
      const param = new Error(errorMessage);
      const instance = new BadRequestError(param);

      expect(instance).to.be.an.instanceOf(BadRequestError);
      expect(instance).to.be.an.instanceOf(Error);

      expect(instance.message).to.exist;
      expect(instance.message).to.be.a('string');
      expect(instance.message).to.eq(errorMessage);
    });
  });

  describe('throw BadRequestError', () => {
    it('should be catchable', () => {
      const errorMessage = 'The Error';

      try {
        throw new BadRequestError(errorMessage);

        // eslint-disable-next-line no-unreachable
        expect(true).to.eq(false);
      } catch (error) {
        expect(error).to.be.an.instanceOf(BadRequestError);
        expect(error).to.be.an.instanceOf(Error);

        expect(error.message).to.exist;
        expect(error.name).to.exist;
        expect(error.status).to.exist;
        expect(error.stack).to.exist;

        expect(error.message).to.be.a('string');
        expect(error.message).to.eq(errorMessage);
        expect(error.name).to.eq('BadRequestError');
        expect(error.status).to.eq(BAD_REQUEST);
        expect(error.stack).to.be.a('string');
      }
    });
  });
});
