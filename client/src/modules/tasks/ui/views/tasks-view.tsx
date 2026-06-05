import { useEffect, useState } from 'react';
import { useShiftStore } from '@/store/shift-store';
import { getTasksByShift } from '@/services/api';
import { TaskItem } from '../components/task-item';
import { TaskSkeleton } from '../components/task-skeleton';

const CATEGORIES = ['opening', 'mid-shift', 'temperature checks', 'closing'];

export const TasksView = () => {
  const { currentShift, tasks, setTasks } = useShiftStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentShift) {
      getTasksByShift(currentShift._id)
        .then((res) => setTasks(res.data.tasks))
        .finally(() => setIsLoading(false));
    }
  }, [currentShift, setTasks]);

  if (isLoading) return <TaskSkeleton />;

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto flex flex-col gap-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-tight">Shift Tasks</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage and track tasks for the current shift.
          </p>
        </div>
      </div>

      {CATEGORIES.map((category) => {
        const categoryTasks = tasks.filter((t) => t.category === category);
        if (categoryTasks.length === 0) return null;

        return (
          <div key={category}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              {category}
            </h2>
            <div className="flex flex-col gap-y-2">
              {categoryTasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};