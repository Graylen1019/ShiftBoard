import { useState } from "react";
import { useShiftStore } from "@/store/shift-store";
import * as api from "@/services/api";
import { generateGreeting } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const OpenShiftModal = () => {
  const [managerName, setManagerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setCurrentShift, setTasks, setGreeting } = useShiftStore();

  const handleOpenShift = async () => {
    if (!managerName.trim()) {
      setError("Manager name is required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const shiftRes = await api.openShift(managerName, date);
      const shift = shiftRes.data.shift;

      const tasksRes = await api.getTasksByShift(shift._id);
      const tasks = tasksRes.data.tasks;

      const hour = new Date().getHours();
      const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

      const greetingRes = await generateGreeting(managerName, tasks.length, timeOfDay);
      setGreeting(greetingRes.data.greeting);

      setCurrentShift(shift);
      setTasks(tasks);
    } catch {
      setError("Failed to open shift. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-panel-bg border border-border-color rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-text-main mb-2">Start Shift</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Enter Credentials to begin opening procedure.
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <Button
            onClick={handleOpenShift}
            disabled={isLoading}
            className="w-full rounded-2xl py-2.5 mt-2 hover:cursor-pointer"
          >
            {isLoading ? 'Opening Shift...' : 'Open Shift'}
          </Button>
        </div>
      </div>
    </div>
  );
};