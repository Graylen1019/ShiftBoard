import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, SkipForward, Flag } from 'lucide-react';
import { updateTask } from '@/services/api';
import { useShiftStore } from '@/store/shift-store';

interface Task {
  _id: string;
  description: string;
  status: string;
  category: string;
}

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { updateTask: updateTaskInStore } = useShiftStore();
  const [isSkipping, setIsSkipping] = useState(false);
  const [skipReason, setSkipReason] = useState('');

  const handleUpdate = async (status: string, reason?: string) => {
    try {
      const res = await updateTask(task._id, status, reason);
      updateTaskInStore(task._id, res.data.task);
      setIsSkipping(false);
    } catch {
      console.error('Failed to update task');
    }
  };

  return (
    <div
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
            <Button size="sm" onClick={() => handleUpdate('complete')} className="rounded-xl">
              <CheckCircle2 className="h-4 w-4 mr-1" /> Complete
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsSkipping(true)} className="rounded-xl">
              <SkipForward className="h-4 w-4 mr-1" /> Skip
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleUpdate('flagged')} className="rounded-xl">
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

      {isSkipping && (
        <div className="flex gap-x-2 mt-3">
          <Input
            placeholder="Reason for skipping..."
            value={skipReason}
            onChange={(e) => setSkipReason(e.target.value)}
          />
          <Button size="sm" variant="outline" className="rounded-xl" onClick={() => handleUpdate('skipped', skipReason)}>
            Confirm
          </Button>
          <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => setIsSkipping(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};