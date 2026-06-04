/// <reference types="jest" />

import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Endpoints', () => {
  let shiftId: string;
  let taskId: string;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/shifts')
      .send({ managerName: 'Graylen', date: '2026-06-03' });

    shiftId = res.body.shift._id;
  });

  it('should get tasks for a shift', async () => {
    const res = await request(app).get(`/api/tasks/${shiftId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('tasks');
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body.tasks.length).toBe(8);

    taskId = res.body.tasks[0]._id;
  });

  it('should mark a task as complete', async () => {
    const tasks = await request(app).get(`/api/tasks/${shiftId}`);
    taskId = tasks.body.tasks[0]._id;

    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ status: 'complete' });

    expect(res.status).toBe(200);
    expect(res.body.task.status).toBe('complete');
    expect(res.body.task).toHaveProperty('completedAt');
  });

  it('should not skip a task without a reason', async () => {
    const tasks = await request(app).get(`/api/tasks/${shiftId}`);
    taskId = tasks.body.tasks[0]._id;

    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ status: 'skipped' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Skip reason is required when skipping a task');
  });

  it('should skip a task with a reason', async () => {
    const tasks = await request(app).get(`/api/tasks/${shiftId}`);
    taskId = tasks.body.tasks[0]._id;

    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ status: 'skipped', skipReason: 'Equipment unavailable' });

    expect(res.status).toBe(200);
    expect(res.body.task.status).toBe('skipped');
    expect(res.body.task.skipReason).toBe('Equipment unavailable');
  });

  it('should flag a task', async () => {
    const tasks = await request(app).get(`/api/tasks/${shiftId}`);
    taskId = tasks.body.tasks[0]._id;

    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ status: 'flagged' });

    expect(res.status).toBe(200);
    expect(res.body.task.status).toBe('flagged');
  });
});