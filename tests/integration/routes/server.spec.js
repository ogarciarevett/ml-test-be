require('rootpath')();
const request = require('supertest');

describe('Server Test', () => {
  let server;

  before(() => (server = require('server', { bustCache: true })));

  after(() => server.close());

  it('should return 200 for health endpoint', done => {
    request(server)
      .get('/health')
      .expect(200, done);
  });

  it('should return 404 for a wrong route', done => {
    request(server)
      .get('/wrong/route')
      .expect(404, done);
  });
});
