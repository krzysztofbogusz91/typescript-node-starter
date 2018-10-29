import * as request from 'supertest';
import app from '../app';
import { expect } from 'chai';
import { config } from '../config/app-config';
import { connector } from '../connectors/mongoose.connector';
import { mockUser, invalidUser } from '../mocks/users.mock';

describe('/user', () => {
  beforeAll(done => {
    connector
      .openConnection(config.testDb)
      .then(() => done())
      .catch(() => done());
  });
  afterAll(done => {
    connector
      .dropDb('users')
      .then(() => {
        connector.closeConnection();
        done();
      })
      .catch(err => {
        connector.closeConnection();
        done();
      });
  });

  it('should response to /user post method', done => {
    const server = app.listen(3001);
    request(server)
      .post(`/user`)
      .send(mockUser)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.status).to.equal(200);
        expect(resp.body.msg).to.equal('user created');
        server.close();
        done();
      });
  });

  it('should return error msg when request body is broken', done => {
    const server = app.listen(3001);
    request(server)
      .post(`/user`)
      .send(invalidUser)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.status).to.equal(500);
        expect(resp.body.msg).to.equal('failed to create user');
        server.close();
        done();
      });
  });
});
