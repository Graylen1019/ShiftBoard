import { Router } from 'express';
import { addWasteEntry, getWasteEntriesByShift, deleteWasteEntry } from '../controllers/wasteEntry-controller';

const router = Router();

router.get('/:shiftId', getWasteEntriesByShift);
router.post('/:shiftId', addWasteEntry);
router.delete('/:id', deleteWasteEntry);

export default router;