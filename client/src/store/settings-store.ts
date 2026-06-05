import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskTemplate {
  id: string;
  category: 'opening' | 'mid-shift' | 'temperature checks' | 'closing';
  description: string;
}

interface SettingsStore {
  theme: 'dark' | 'light';
  managerName: string;
  location: string;
  taskTemplates: TaskTemplate[];

  setTheme: (theme: 'dark' | 'light') => void;
  setManagerName: (name: string) => void;
  setLocation: (location: string) => void;
  addTaskTemplate: (task: TaskTemplate) => void;
  removeTaskTemplate: (id: string) => void;
  updateTaskTemplate: (id: string, updates: Partial<TaskTemplate>) => void;
}

const DEFAULT_TEMPLATES: TaskTemplate[] = [
  { id: '1', category: 'opening', description: 'Check temperatures' },
  { id: '2', category: 'opening', description: 'Stock prep stations' },
  { id: '3', category: 'mid-shift', description: 'Restock supplies' },
  { id: '4', category: 'mid-shift', description: 'Check food levels' },
  { id: '5', category: 'temperature checks', description: 'Log fridge temps' },
  { id: '6', category: 'temperature checks', description: 'Log freezer temps' },
  { id: '7', category: 'closing', description: 'Clean all stations' },
  { id: '8', category: 'closing', description: 'Complete waste log' },
];

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      managerName: '',
      location: '',
      taskTemplates: DEFAULT_TEMPLATES,

      setTheme: (theme) => {
        document.documentElement.className = theme;
        set({ theme });
      },
      setManagerName: (name) => set({ managerName: name }),
      setLocation: (location) => set({ location }),
      addTaskTemplate: (task) =>
        set((state) => ({ taskTemplates: [...state.taskTemplates, task] })),
      removeTaskTemplate: (id) =>
        set((state) => ({
          taskTemplates: state.taskTemplates.filter((t) => t.id !== id),
        })),
      updateTaskTemplate: (id, updates) =>
        set((state) => ({
          taskTemplates: state.taskTemplates.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
    }),
    {
      name: 'shiftboard-settings',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.className = state.theme;
        }
      },
    }
  )
);