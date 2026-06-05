interface ProgressCardProps {
  completionRate: number;
  completedTasks: number;
  pendingTasks: number;
}

export const ProgressCard = ({ completionRate, completedTasks, pendingTasks }: ProgressCardProps) => {
  return (
    <div className="bg-panel-bg border border-border-color rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">Task Completion</span>
        <span className="text-sm font-bold text-text-main">{completionRate}%</span>
      </div>
      <div className="w-full h-2 bg-border-color rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700"
          style={{ width: `${completionRate}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>{completedTasks} done</span>
        <span>{pendingTasks} remaining</span>
      </div>
    </div>
  );
};