/// <reference types="jest" />
import { 
  calculateTaskCompletionRate, 
  calculateWasteTotalsByCategory,
  calculateTotalWaste,
  getFlaggedTasks
} from '../utils/reportUtils';

const mockTasks: any[] = [
  { status: 'completed', category: 'opening', description: 'Task 1' },
  { status: 'completed', category: 'opening', description: 'Task 2' },
  { status: 'skipped', category: 'mid-shift', description: 'Task 3' },
  { status: 'flagged', category: 'closing', description: 'Task 4' },
  { status: 'pending', category: 'closing', description: 'Task 5' },
];

const mockWasteEntries: any[] = [
  { category: 'food', item: 'burger patties', quantity: 5, unit: 'portions' },
  { category: 'food', item: 'buns', quantity: 3, unit: 'units' },
  { category: 'beverage', item: 'coffee', quantity: 2, unit: 'oz' },
  { category: 'packaging', item: 'bags', quantity: 10, unit: 'units' },
];

describe('Report Utility Functions', () => {
  describe('calculateTaskCompletionRate', () => {
    it('should return correct completion rate', () => {
      expect(calculateTaskCompletionRate(mockTasks)).toBe(40);
    });

    it('should return 0 for empty tasks', () => {
      expect(calculateTaskCompletionRate([])).toBe(0);
    });

    it('should return 100 when all tasks are completed', () => {
      const allComplete: any[] = [
        { status: 'completed' },
        { status: 'completed' },
      ];
      expect(calculateTaskCompletionRate(allComplete)).toBe(100);
    });

    it('should return 0 when no tasks are completed', () => {
      const noneComplete: any[] = [
        { status: 'pending' },
        { status: 'skipped' },
      ];
      expect(calculateTaskCompletionRate(noneComplete)).toBe(0);
    });
  });

  describe('calculateWasteTotalsByCategory', () => {
    it('should return correct totals by category', () => {
      const totals = calculateWasteTotalsByCategory(mockWasteEntries);
      expect(totals['food']).toBe(8);
      expect(totals['beverage']).toBe(2);
      expect(totals['packaging']).toBe(10);
    });

    it('should return empty object for no entries', () => {
      expect(calculateWasteTotalsByCategory([])).toEqual({});
    });
  });

  describe('calculateTotalWaste', () => {
    it('should return correct total waste', () => {
      expect(calculateTotalWaste(mockWasteEntries)).toBe(20);
    });

    it('should return 0 for empty entries', () => {
      expect(calculateTotalWaste([])).toBe(0);
    });
  });

  describe('getFlaggedTasks', () => {
    it('should return only flagged tasks', () => {
      const flagged = getFlaggedTasks(mockTasks);
      expect(flagged.length).toBe(1);
      expect(flagged[0].description).toBe('Task 4');
    });

    it('should return empty array when no tasks are flagged', () => {
      const noFlags: any[] = [
        { status: 'completed' },
        { status: 'pending' },
      ];
      expect(getFlaggedTasks(noFlags)).toEqual([]);
    });
  });
});