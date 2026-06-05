import {
  Clipboard,
  RecycleIcon,
  Settings2Icon,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useShiftStore } from "@/store/shift-store";
import { useSettingsStore } from "@/store/settings-store";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const { currentShift } = useShiftStore();
  const { managerName, location } = useSettingsStore();

  const navItems = [
    {
      to: "/overview",
      label: "Overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    { to: "/tasks", label: "Tasks", icon: <Clipboard className="h-4 w-4" /> },
    {
      to: "/waste",
      label: "Waste Log",
      icon: <RecycleIcon className="h-4 w-4" />,
    },
    {
      to: "/reports",
      label: "Shift Report",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  return (
    <aside
      className={`h-full bg-panel-bg border-r border-border-color transition-all duration-300 ease-in-out overflow-y-auto flex flex-col shrink-0
        ${isOpen ? "w-64 px-4 pb-2 pt-8 opacity-100" : "w-0 p-0 opacity-0 pointer-events-none border-none"}
      `}
    >
      <div className="flex flex-col gap-1 pb-4 border-b border-border-color whitespace-nowrap">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Active Shift
        </p>
        <p className="text-text-main text-sm font-medium">
          {currentShift?.managerName ?? "—"}
        </p>
        <p className="text-xs text-muted-foreground">
          {currentShift?.startTime
            ? new Date(currentShift.startTime).toLocaleTimeString()
            : "—"}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-y-1 flex-1">
        {navItems.map(({ to, label, icon }) => {
          const isActive = location === to;
          return (
            <Button
              key={to}
              variant="ghost"
              className={`justify-start w-full gap-x-3 rounded-xl text-sm transition-all
                ${
                  isActive
                    ? "bg-border-color text-text-main font-medium"
                    : "text-muted-foreground hover:text-text-main hover:bg-border-color"
                }`}
              asChild
            >
              <Link to={to} className="flex items-center gap-x-3">
                {icon}
                <span>{label}</span>
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="flex items-center justify-between py-4 mt-auto border-t border-border-color whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-border-color flex items-center justify-center text-xs text-text-main font-medium">
            {currentShift?.managerName?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-text-main font-medium leading-tight">
              {managerName || currentShift?.managerName || "Manager"}
            </p>
            <p className="text-xs text-muted-foreground leading-tight">
              {location || "On shift"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="h-9 w-9 p-0 text-muted-foreground hover:text-text-main"
          asChild
        >
          <Link to="/settings" className="flex items-center justify-center">
            <Settings2Icon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </aside>
  );
};
