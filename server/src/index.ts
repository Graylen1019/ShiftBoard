import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

import shiftRoutes from './routes/shift-routes';
import taskRoutes from './routes/task-routes';
import wasteEntryRoutes from './routes/wasteEntry-routes';
import aiRoutes from './routes/ai-routes';

app.use('/api/shifts', shiftRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/waste', wasteEntryRoutes);
app.use('/api/ai', aiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
