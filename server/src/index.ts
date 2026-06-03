import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import shiftRoutes from './routes/shift-routes';
import taskRoutes from './routes/task-routes';
import wasteEntryRoutes from './routes/wasteEntry-routes';
import aiRoutes from './routes/ai-routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/shifts', shiftRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/waste', wasteEntryRoutes);
app.use('/api/ai', aiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("ShiftBoard API running");
});

const start = async () => {
  await connectDB();
  if (process.env.GEMINI_API_KEY) {
    console.log('Gemini AI ready');
  } else {
    console.warn('Warning: GEMINI_API_KEY is not set');
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();