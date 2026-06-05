import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useState, useEffect } from "react";

interface ShiftWasteCardsProps {
  completedTasks: number;
  pendingTasks: number;
  totalWaste: number;
  managerName: string;
  startTime: string;
}

export const ShiftWasteCards = ({
  completedTasks,
  pendingTasks,
  totalWaste,
  managerName,
  startTime,
}: ShiftWasteCardsProps) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime) return;
    const update = () => {
      setElapsed(
        Math.floor((Date.now() - new Date(startTime).getTime()) / 60000),
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>Shift Details</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-text-main">Elapsed Time: {elapsed} mins</p>
            <p className="text-text-main">Manager: {managerName}</p>
            <p className="text-text-main">Tasks Completed: {completedTasks}</p>
            <p className="text-text-main">Tasks Remaining: {pendingTasks}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-xs">
            Started at{" "}
            {startTime ? new Date(startTime).toLocaleTimeString() : ""}
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>Waste Summary</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-text-main">Total Waste: {totalWaste} units</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-xs">Updated live</p>
        </CardFooter>
      </Card>
    </div>
  );
};
