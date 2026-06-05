import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Shift {
  _id: string;
  managerName: string;
  date: string;
  status: "open" | "closed";
  startTime: string;
  endTime?: string;
  foodCostVariance?: number;
}

interface Task {
  _id: string;
  shift: string;
  category: "opening" | "mid-shift" | "temperature checks" | "closing";
  description: string;
  status: "pending action" | "complete" | "skipped" | "flagged" | "in progress";
  skipReason?: string;
  completedAt?: string;
}

interface WasteEntry {
  _id: string;
  shift: string;
  category: "food" | "beverage" | "packaging" | "other";
  item: string;
  quantity: number;
  unit: string;
  note?: string;
  createdAt: string;
}

interface ShiftStore {
  currentShift: Shift | null;
  tasks: Task[];
  wasteEntries: WasteEntry[];
  isLoading: boolean;
  error: string | null;
  greeting: string | null;

  setCurrentShift: (shift: Shift | null) => void;
  setTasks: (tasks: Task[]) => void;
  setWasteEntries: (entries: WasteEntry[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addWasteEntry: (entry: WasteEntry) => void;
  removeWasteEntry: (entryId: string) => void;
  clearShift: () => void;
  setGreeting: (greeting: string | null) => void;
}

export const useShiftStore = create<ShiftStore>()(
  persist(
    (set) => ({
      currentShift: null,
      tasks: [],
      wasteEntries: [],
      isLoading: false,
      error: null,
      greeting: null,

      setCurrentShift: (shift) => set({ currentShift: shift }),
      setTasks: (tasks) => set({ tasks }),
      setWasteEntries: (entries) => set({ wasteEntries: entries }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setGreeting: (greeting) => set({ greeting }),

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t._id === taskId ? { ...t, ...updates } : t,
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
        set({ currentShift: null, tasks: [], wasteEntries: [], greeting: null }),
    }),
    {
      name: "shiftboard-store",
      partialize: (state) => ({
        currentShift: state.currentShift,
        tasks: state.tasks,
        wasteEntries: state.wasteEntries,
        greeting: state.greeting,
      }),
    },
  ),
);
