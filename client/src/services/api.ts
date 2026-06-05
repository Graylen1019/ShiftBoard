import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const openShift = (managerName: string, date: string) =>
  api.post("/shifts", { managerName, date });

export const closeShift = (shiftId: string, foodCostVariance: number) =>
  api.patch(`/shifts/${shiftId}/close`, { foodCostVariance });

export const getShifts = () => api.get("/shifts");

export const getShiftById = (shiftId: string) => api.get(`/shifts/${shiftId}`);

export const getTasksByShift = (shiftId: string) =>
  api.get(`/tasks/${shiftId}`);

export const updateTask = (
  taskId: string,
  status: string,
  skipReason?: string,
) => api.patch(`/tasks/${taskId}`, { status, skipReason });

export const getWasteEntriesByShift = (shiftId: string) =>
  api.get(`/waste/${shiftId}`);

export const addWasteEntry = (
  shiftId: string,
  data: {
    category: string;
    item: string;
    quantity: number;
    unit: string;
    note?: string;
  },
) => api.post(`/waste/${shiftId}`, data);

export const deleteWasteEntry = (entryId: string) =>
  api.delete(`/waste/${entryId}`);

export const summarizeShift = (shiftId: string) =>
  api.get(`/ai/summarize/${shiftId}`);

export const analyzeWasteTrends = () => api.get("/ai/waste-trends");

export const suggestTasks = (shiftType: string) =>
  api.post("/ai/suggest-tasks", { shiftType });

export const generateGreeting = (managerName: string, taskCount: number, timeOfDay: string) =>
  api.post('/ai/greeting', { managerName, taskCount, timeOfDay });
