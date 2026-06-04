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

describe('Waste Entry Endpoints', () => {
  let shiftId: string;
  let entryId: string;

  beforeEach(async () => {
    const res = await request(app)
      .post('/api/shifts')
      .send({ managerName: 'Graylen', date: '2026-06-03' });

    shiftId = res.body.shift._id;
  });

  it('should add a waste entry', async () => {
    const res = await request(app)
      .post(`/api/waste/${shiftId}`)
      .send({
        category: 'food',
        item: 'burger patties',
        quantity: 5,
        unit: 'each',
        note: 'overcooked during rush',
      });

    expect(res.status).toBe(201)
    expect(res.body.entry).toHaveProperty('_id');
    expect(res.body.entry.item).toBe('burger patties');
    expect(res.body.entry.quantity).toBe(5);

    entryId = res.body.entry._id;
  });

  it('should not add a waste entry with quantity of zero', async () => {
    const res = await request(app)
      .post(`/api/waste/${shiftId}`)
      .send({
        category: 'food',
        item: 'burger patties',
        quantity: 0,
        unit: 'each',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Quantity must be greater than zero');
  });

  it('should not add a waste entry with negative quantity', async () => {
    const res = await request(app)
      .post(`/api/waste/${shiftId}`)
      .send({
        category: 'food',
        item: 'burger patties',
        quantity: -1,
        unit: 'each',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Quantity must be greater than zero');
  });

  it('should get waste entries for a shift', async () => {
    await request(app)
      .post(`/api/waste/${shiftId}`)
      .send({
        category: 'food',
        item: 'burger patties',
        quantity: 5,
        unit: 'each',
      });

    const res = await request(app).get(`/api/waste/${shiftId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('entries');
    expect(Array.isArray(res.body.entries)).toBe(true);
    expect(res.body.entries.length).toBeGreaterThan(0);
  });

  it('should delete a waste entry', async () => {
    const entry = await request(app)
      .post(`/api/waste/${shiftId}`)
      .send({
        category: 'food',
        item: 'burger patties',
        quantity: 5,
        unit: 'each',
      });

    entryId = entry.body.entry._id;

    const res = await request(app).delete(`/api/waste/${entryId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Waste entry deleted');
  });
});