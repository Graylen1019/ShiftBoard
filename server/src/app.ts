import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import shiftRoutes from './routes/shift-routes';
import taskRoutes from './routes/task-routes';
import wasteEntryRoutes from './routes/wasteEntry-routes';
import aiRoutes from './routes/ai-routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/shifts', shiftRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/waste', wasteEntryRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('ShiftBoard API running');
});

export default app;