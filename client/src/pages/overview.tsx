import { useEffect } from 'react';
import { useShiftStore } from '@/store/shift-store';
import { getWasteEntriesByShift, getTasksByShift } from '@/services/api';
import { ShiftWasteCards } from '@/components/Overview/shift-waste-cards';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const Overview = () => {
  const { currentShift, tasks, wasteEntries, setWasteEntries, setTasks } = useShiftStore();

  useEffect(() => {
    if (currentShift) {
      getTasksByShift(currentShift._id).then((res) => {
        setTasks(res.data.tasks);
      });
      getWasteEntriesByShift(currentShift._id).then((res) => {
        setWasteEntries(res.data.entries);
      });
    }
  }, [currentShift, setTasks, setWasteEntries]);

  const completedTasks = tasks.filter((t) => t.status === 'complete').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending action').length;
  const totalWaste = wasteEntries.reduce((sum, e) => sum + e.quantity, 0);

  return (
    <div className="py-6 px-10">
      <div className="border-b-2 border-border w-full max-w-3xl p-2">
        <h1 className="text-text-main text-2xl font-bold">
          Hello, {currentShift?.managerName}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Shift started at {currentShift ? new Date(currentShift.startTime).toLocaleTimeString() : ''}
        </p>
      </div>

      <div className="flex w-full max-w-3xl mt-12 justify-between gap-6">
        <ShiftWasteCards
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          totalWaste={totalWaste}
          managerName={currentShift?.managerName ?? ''}
          startTime={currentShift?.startTime ?? ''}
        />

        <div>
          <Card className="py-4 px-8">
            <CardHeader>Tasks to be completed:</CardHeader>
            <CardContent>
              {pendingTasks === 0 ? (
                <p className="text-muted-foreground text-sm">All tasks complete!</p>
              ) : (
                <p className="text-text-main">{pendingTasks} tasks remaining</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};