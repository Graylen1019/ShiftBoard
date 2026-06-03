import { Router } from 'express';
import { getTasksByShift, updateTask } from '../controllers/task-controller';

const router = Router();

router.get('/:shiftId', getTasksByShift);
router.patch('/:id', updateTask);

export default router;