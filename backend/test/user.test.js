const request = require('supertest');
const app = require('../server');
const userModel = require('../models/userModel');

describe('User Endpoints', () => {
  let token;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/user/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
    token = res.body.token;
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({
        email: 'testuser@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should get user info', async () => {
    const res = await request(app)
      .get('/api/user/getuser')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  });
});
