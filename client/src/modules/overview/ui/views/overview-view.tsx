import { useEffect, useState } from 'react';
import { useShiftStore } from '@/store/shift-store';
import { getWasteEntriesByShift, getTasksByShift } from '@/services/api';
import { OverviewSkeleton } from '../components/overview-skeleton';
import { StatCard } from '../components/stat-card';
import { ProgressCard } from '../components/progress-card';
import { GreetingCard } from '../components/greeting-card';
import { QuickActions } from '../components/quick-actions';
import { Clock, CheckSquare, AlertTriangle, Trash } from 'lucide-react';

export const OverviewView = () => {
  const { currentShift, tasks, wasteEntries, setWasteEntries, setTasks, greeting } = useShiftStore();
  const [isLoading, setIsLoading] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (currentShift) {
      Promise.all([
        getTasksByShift(currentShift._id),
        getWasteEntriesByShift(currentShift._id),
      ]).then(([tasksRes, wasteRes]) => {
        setTasks(tasksRes.data.tasks);
        setWasteEntries(wasteRes.data.entries);
      }).finally(() => setIsLoading(false));
    }
  }, [currentShift, setTasks, setWasteEntries]);

  useEffect(() => {
    if (!currentShift) return;
    const update = () => {
      setElapsed(Math.floor((Date.now() - new Date(currentShift.startTime).getTime()) / 60000));
      setCurrentTime(new Date());
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [currentShift]);

  if (isLoading) return <OverviewSkeleton />;

  const completedTasks = tasks.filter((t) => t.status === 'complete').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending action').length;
  const flaggedTasks = tasks.filter((t) => t.status === 'flagged').length;
  const totalWaste = wasteEntries.reduce((sum, e) => sum + e.quantity, 0);
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="px-8 py-8 max-w-5xl mx-auto flex flex-col gap-y-8">

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono text-green-400 border border-green-400/30 bg-green-400/10 px-2 py-0.5 rounded-md tracking-widest uppercase">
              Shift Active
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-text-main tracking-tight">
            Hello, {currentShift?.managerName}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Started at {currentShift ? new Date(currentShift.startTime).toLocaleTimeString() : ''}
          </p>
        </div>
      </div>

      {greeting && <GreetingCard greeting={greeting} />}

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Elapsed" value={`${elapsed}m`} icon={<Clock className="h-4 w-4" />} color="text-blue-400" />
        <StatCard label="Completed" value={completedTasks} icon={<CheckSquare className="h-4 w-4" />} color="text-green-400" />
        <StatCard label="Flagged" value={flaggedTasks} icon={<AlertTriangle className="h-4 w-4" />} color="text-yellow-400" />
        <StatCard label="Waste" value={totalWaste} icon={<Trash className="h-4 w-4" />} color="text-red-400" />
      </div>

      <ProgressCard
        completionRate={completionRate}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <QuickActions
        pendingTasks={pendingTasks}
        wasteEntries={wasteEntries.length}
        completionRate={completionRate}
      />
    </div>
  );
};