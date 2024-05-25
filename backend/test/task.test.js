const request = require('supertest');
const app = require('../server');
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');

describe('Task Endpoints', () => {
  let token;

  beforeAll(async () => {
    const user = await userModel.create({
      name: 'Task User',
      email: 'taskuser@example.com',
      password: 'Password123!',
    });

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/task/addTask')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Task description',
        dueDate: new Date(),
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task added successfully');
  });

  it('should get tasks for a user', async () => {
    const res = await request(app)
      .get('/api/task/getTask')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update a task', async () => {
    const task = await taskModel.create({
      title: 'Old Task',
      description: 'Old description',
      userId: 'dummyUserId',
      completed: false,
      dueDate: new Date(),
    });

    const res = await request(app)
      .put(`/api/task/editTask/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task',
        description: 'Updated description',
        completed: true,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Task');
  });

  it('should delete a task', async () => {
    const task = await taskModel.create({
      title: 'Task to delete',
      description: 'Delete this task',
      userId: 'dummyUserId',
      completed: false,
      dueDate: new Date(),
    });

    const res = await request(app)
      .delete(`/api/task/removeTask/${task._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted successfully');
  });
});
