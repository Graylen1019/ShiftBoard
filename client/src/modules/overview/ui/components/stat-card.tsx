import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export const StatCard = ({ label, value, icon, color }: StatCardProps) => {
  return (
    <div className="bg-panel-bg border border-border-color rounded-2xl p-5 flex flex-col gap-2">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs uppercase tracking-widest font-mono">{label}</span>
      </div>
      <p className="text-3xl font-bold text-text-main">{value}</p>
    </div>
  );
};