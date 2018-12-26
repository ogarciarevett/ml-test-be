require('rootpath')();
const { expect } = require('chai');
const request = require('supertest');
const HTTP_STATUSES = require('http-status-codes');

const API_ROUTE = '/api/items';
const invalidId = 'MLA712715741NOPE';
const goodID = 'MLA712715741';
let server;

const itemResponse = ['id', 'title', 'price', 'permalink', 'picture', 'condition', 'free_shipping', 'sold_quantity', 'address', 'description'];
const itemsResponse = ['author', 'categories', 'items'];

describe('items routes test', () => {
  before(() => (server = require('server')));
  after(async () => server.close());

  describe('GET v1/items', done => {
    it('should return the item results', done => {
      request(server)
        .get(API_ROUTE)
        .end((err, res) => {
          if (err) done(err);
          expect(res.statusCode).to.eq(HTTP_STATUSES.OK);
          expect(res.body).to.exist;
          expect(res.body.items).to.be.an('array');
          expect(Object.keys(res.body).sort()).to.be.eql(itemsResponse);
          done();
        });
    });
  });

  describe('GET api/items/:id', done => {
    it(`should return the item ${goodID}`, done => {
      request(server)
        .get(`${API_ROUTE}/${goodID}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res.statusCode).to.equal(HTTP_STATUSES.OK);
          expect(res.body).to.exist;
          expect(res.body).to.be.an('object');
          expect(Object.keys(res.body)).to.deep.equal(itemResponse);
          done();
        });
    });

    it('should return 404 if the item does not exists', done => {
      request(server)
        .get(`${API_ROUTE}/${invalidId}`)
        .expect(HTTP_STATUSES.NOT_FOUND, done);
    });
  });
});
