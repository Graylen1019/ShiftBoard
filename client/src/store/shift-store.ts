import { create } from 'zustand';

interface Shift {
  _id: string;
  managerName: string;
  date: string;
  status: 'open' | 'closed';
  startTime: string;
  endTime?: string;
  foodCostVariance?: number;
}

interface Task {
  _id: string;
  shift: string;
  category: 'opening' | 'mid-shift' | 'temperature checks' | 'closing';
  description: string;
  status: 'pending' | 'complete' | 'skipped' | 'flagged';
  skipReason?: string;
  completedAt?: string;
}

interface WasteEntry {
  _id: string;
  shift: string;
  category: 'food' | 'beverage' | 'packaging' | 'other';
  item: string;
  quantity: number;
  unit: 'lbs' | 'oz' | 'units' | 'portions';
  note?: string;
  createdAt: string;
}

interface ShiftStore {
  currentShift: Shift | null;
  tasks: Task[];
  wasteEntries: WasteEntry[];
  isLoading: boolean;
  error: string | null;

  setCurrentShift: (shift: Shift | null) => void;
  setTasks: (tasks: Task[]) => void;
  setWasteEntries: (entries: WasteEntry[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addWasteEntry: (entry: WasteEntry) => void;
  removeWasteEntry: (entryId: string) => void;
  clearShift: () => void;
}

export const useShiftStore = create<ShiftStore>((set) => ({
  currentShift: null,
  tasks: [],
  wasteEntries: [],
  isLoading: false,
  error: null,

  setCurrentShift: (shift) => set({ currentShift: shift }),
  setTasks: (tasks) => set({ tasks }),
  setWasteEntries: (entries) => set({ wasteEntries: entries }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === taskId ? { ...t, ...updates } : t
      ),
    })),

  addWasteEntry: (entry) =>
    set((state) => ({
      wasteEntries: [entry, ...state.wasteEntries],
    })),

  removeWasteEntry: (entryId) =>
    set((state) => ({
      wasteEntries: state.wasteEntries.filter((e) => e._id !== entryId),
    })),

  clearShift: () =>
    set({ currentShift: null, tasks: [], wasteEntries: [] }),
}));