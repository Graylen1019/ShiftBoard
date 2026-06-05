import { Link } from 'react-router-dom';
import { Clipboard, RecycleIcon, FileText, ChevronRight } from 'lucide-react';

interface QuickActionsProps {
  pendingTasks: number;
  wasteEntries: number;
  completionRate: number;
}

export const QuickActions = ({ pendingTasks, wasteEntries, completionRate }: QuickActionsProps) => {
  const actions = [
    {
      label: 'View Tasks',
      sub: `${pendingTasks} remaining`,
      to: '/tasks',
      icon: <Clipboard className="h-5 w-5" />,
    },
    {
      label: 'Log Waste',
      sub: `${wasteEntries} entries`,
      to: '/waste',
      icon: <RecycleIcon className="h-5 w-5" />,
    },
    {
      label: 'Shift Report',
      sub: `${completionRate}% complete`,
      to: '/reports',
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-1">
        Quick Actions
      </p>
      {actions.map(({ label, sub, to, icon }) => (
        <Link
          key={to}
          to={to}
          className="flex items-center justify-between p-4 bg-panel-bg border border-border-color rounded-2xl hover:border-primary/50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground group-hover:text-primary transition-colors">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-text-main">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      ))}
    </div>
  );
};