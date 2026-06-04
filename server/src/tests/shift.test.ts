/// <reference types="jest" />

import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Shift Endpoints", () => {
  let shiftId: string;

  it("should open a new shift", async () => {
    const res = await request(app)
      .post("/api/shifts")
      .send({ managerName: "Graylen", date: "2026-06-03" });

    console.log(res.body);

    expect(res.status).toBe(201);
    expect(res.body.shift).toHaveProperty("_id");
    expect(res.body.shift.managerName).toBe("Graylen");
    expect(res.body.shift.status).toBe("open");

    shiftId = res.body.shift._id;
  });

  it("should not open a shift without a manager name", async () => {
    const res = await request(app)
      .post("/api/shifts")
      .send({ date: "2026-06-03" });

    expect(res.status).toBe(500);
  });

  it("should get all shifts", async () => {
    const res = await request(app).get("/api/shifts");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shifts");
    expect(Array.isArray(res.body.shifts)).toBe(true);
  });

  it("should get a shift by id", async () => {
    const res = await request(app).get(`/api/shifts/${shiftId}`);

    expect(res.status).toBe(200);
    expect(res.body.shift).toHaveProperty("_id");
    expect(res.body.shift._id).toBe(shiftId);
  });

  it("should close a shift", async () => {
    const res = await request(app)
      .patch(`/api/shifts/${shiftId}/close`)
      .send({ foodCostVariance: 150 });

      console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body.shift.status).toBe("closed");
    expect(res.body.shift.foodCostVariance).toBe(150)
  });

  it("should return 404 for a non existent shift", async () => {
    const res = await request(app).get("/api/shifts/000000000000000000000000");

    expect(res.status).toBe(404);
  });
});
