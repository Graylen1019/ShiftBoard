import { Router } from 'express';
import { generateGreeting, generateShiftSummary, analyzeWasteTrends, suggestTasks } from '../controllers/ai-controller';

const router = Router();

router.post('/greeting', generateGreeting);
router.post('/suggest-tasks', suggestTasks);
router.get('/summarize/:shiftId', generateShiftSummary);
router.get('/waste-trends', analyzeWasteTrends);

export default router;