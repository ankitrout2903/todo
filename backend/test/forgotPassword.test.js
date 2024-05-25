const request = require('supertest');
const app = require('../server');
const userModel = require('../models/userModel');
const crypto = require('crypto');

describe('Forgot Password Endpoints', () => {
  let user;

  beforeAll(async () => {
    user = await userModel.create({
      name: 'Forgot User',
      email: 'forgotuser@example.com',
      password: 'Password123!',
    });
  });

  it('should handle forgot password request', async () => {
    const res = await request(app)
      .post('/api/forgotPassword/forgotPassword')
      .send({
        email: 'forgotuser@example.com',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should reset password', async () => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    await user.save();

    const res = await request(app)
      .post('/api/forgotPassword/resetPassword')
      .send({
        token: resetToken,
        password: 'NewPassword123!',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Password reset successful');
  });
});
