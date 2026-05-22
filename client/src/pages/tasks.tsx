import { useState } from "react";
import { Plus, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define a type for our mock tasks
interface Task {
  id: string;
  title: string;
  assignee: string;
  completed: boolean;
}

export const Tasks = () => {
  // Mock data representing a typical dashboard list from your Express backend
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Verify opening shift inventory count", assignee: "Manager Joe", completed: false },
    { id: "2", title: "Complete hourly waste logs for kitchen line", assignee: "Alex M.", completed: true },
    { id: "3", title: "Submit daily shift report to AWS instance", assignee: "Supervisor User", completed: false },
    { id: "4", title: "Calibrate freezer temperature sensors", assignee: "Alex M.", completed: false },
  ]);

  // Simple handler to test interactivity inside the React Router viewport
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="px-6 py-32 max-w-4xl mx-auto flex flex-col gap-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-[#2d2d2d] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Shift Tasks</h1>
          <p className="text-xs text-gray-400 mt-1">Manage and track live tasks for the current shift period.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-x-2 rounded-xl">
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>

      {/* Task Stack Container */}
      <div className="flex flex-col gap-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between p-4 bg-[#1e1e1e] border rounded-xl cursor-pointer transition-all duration-200 select-none
              ${task.completed ? "border-blue-500/30 opacity-60" : "border-[#2d2d2d] hover:border-gray-600"}
            `}
          >
            <div className="flex items-center gap-x-4">
              {/* Conditional Icon State */}
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-gray-500 shrink-0 hover:text-gray-400" />
              )}
              
              <span className={`text-sm ${task.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
                {task.title}
              </span>
            </div>

            {/* Meta Pill Tag */}
            <div className="text-[11px] bg-[#141414] text-gray-400 px-2.5 py-1 rounded-md border border-[#2d2d2d]">
              {task.assignee}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};