import { Router } from 'express';
import { 
    openShift, 
    closeShift, 
    getShifts, 
    getShiftById 
} from '../controllers/shift-controller';

const router = Router();

router.get('/', getShifts);
router.get('/:id', getShiftById);
router.post('/', openShift);
router.patch('/:id/close', closeShift);

export default router;