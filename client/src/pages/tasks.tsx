import { useEffect } from 'react';
import { useShiftStore } from '@/store/shift-store';
import { getTasksByShift, updateTask } from '@/services/api';
import { CheckCircle2, Circle, SkipForward, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const Tasks = () => {
  const { currentShift, tasks, setTasks, updateTask: updateTaskInStore } = useShiftStore();
  const [skipReason, setSkipReason] = useState<{ [key: string]: string }>({});
  const [skippingId, setSkippingId] = useState<string | null>(null);

  useEffect(() => {
    if (currentShift) {
      getTasksByShift(currentShift._id).then((res) => {
        setTasks(res.data.tasks);
      });
    }
  }, [currentShift, setTasks]);

  const handleUpdateTask = async (taskId: string, status: string, reason?: string) => {
    try {
      const res = await updateTask(taskId, status, reason);
      updateTaskInStore(taskId, res.data.task);
      setSkippingId(null);
    } catch {
      console.error('Failed to update task');
    }
  };

  const categories = ['opening', 'mid-shift', 'temperature checks', 'closing'];

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

      {categories.map((category) => {
        const categoryTasks = tasks.filter((t) => t.category === category);
        if (categoryTasks.length === 0) return null;

        return (
          <div key={category}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              {category}
            </h2>

            <div className="flex flex-col gap-y-2">
              {categoryTasks.map((task) => (
                <div
                  key={task._id}
                  className={`flex flex-col p-4 bg-panel-bg border rounded-xl transition-all duration-200
                    ${task.status === 'complete' ? 'border-primary/30 opacity-60' : ''}
                    ${task.status === 'flagged' ? 'border-destructive/50' : ''}
                    ${task.status === 'skipped' ? 'border-muted opacity-50' : ''}
                    ${task.status === 'pending action' ? 'border-border-color' : ''}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                      {task.status === 'complete' ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <span className={`text-sm ${task.status === 'complete' || task.status === 'skipped' ? 'line-through text-muted-foreground' : 'text-text-main'}`}>
                        {task.description}
                      </span>
                    </div>

                    {task.status === 'pending action' && (
                      <div className="flex gap-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateTask(task._id, 'complete')}
                          className="rounded-xl"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSkippingId(task._id)}
                          className="rounded-xl"
                        >
                          <SkipForward className="h-4 w-4 mr-1" /> Skip
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUpdateTask(task._id, 'flagged')}
                          className="rounded-xl"
                        >
                          <Flag className="h-4 w-4 mr-1" /> Flag
                        </Button>
                      </div>
                    )}

                    {(task.status === 'complete' || task.status === 'skipped' || task.status === 'flagged') && (
                      <span className="text-xs text-muted-foreground px-2 py-1 border border-border rounded-md">
                        {task.status}
                      </span>
                    )}
                  </div>

                  {skippingId === task._id && (
                    <div className="flex gap-x-2 mt-3">
                      <Input
                        placeholder="Reason for skipping..."
                        value={skipReason[task._id] || ''}
                        onChange={(e) => setSkipReason({ ...skipReason, [task._id]: e.target.value })}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => handleUpdateTask(task._id, 'skipped', skipReason[task._id])}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl"
                        onClick={() => setSkippingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};