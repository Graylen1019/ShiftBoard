import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shiftRoutes from './routes/shift-routes';
import taskRoutes from './routes/task-routes';
import wasteEntryRoutes from './routes/wasteEntry-routes';
import aiRoutes from './routes/ai-routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

app.use(express.json());

app.use('/api/shifts', shiftRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/waste', wasteEntryRoutes);
app.use('/api/ai', aiRoutes);

app.post('/test', (req, res) => {
  console.log('TEST ROUTE HIT');
  res.json({ message: 'test works' });
});

app.get('/', (req: Request, res: Response) => {
  res.send('ShiftBoard API running');
});

export default app;