import { ITask } from '../models/task';
import { IWasteEntry } from '../models/waste-entry';

export const calculateTaskCompletionRate = (tasks: ITask[]): number => {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'completed').length;
  return Math.round((completed / tasks.length) * 100);
};

export const calculateWasteTotalsByCategory = (entries: IWasteEntry[]): Record<string, number> => {
  return entries.reduce((totals, entry) => {
    const category = entry.category;
    totals[category] = (totals[category] || 0) + entry.quantity;
    return totals;
  }, {} as Record<string, number>);
};

export const calculateTotalWaste = (entries: IWasteEntry[]): number => {
  return entries.reduce((sum, entry) => sum + entry.quantity, 0);
};

export const getFlaggedTasks = (tasks: ITask[]): ITask[] => {
  return tasks.filter(t => t.status === 'flagged');
};