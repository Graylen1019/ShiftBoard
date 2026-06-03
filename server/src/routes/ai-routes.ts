import { Router } from 'express';
import { generateShiftSummary, analyzeWasteTrends, suggestTasks } from '../controllers/ai-controller';

const router = Router();

router.get('/summarize/:shiftId', generateShiftSummary);
router.get('/waste-trends', analyzeWasteTrends);
router.post('/suggest-tasks', suggestTasks);

export default router;