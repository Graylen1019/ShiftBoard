// src/components/sidebar/sidebar.tsx
import { Clipboard, RecycleIcon, Settings2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`h-full bg-panel-bg border-r-2 border-border-color transition-all duration-300 ease-in-out overflow-y-auto flex flex-col shrink-0
        ${isOpen ? "w-67.5 px-4 pb-2 pt-8 opacity-100" : "w-0 p-0 opacity-0 pointer-events-none border-none"}
      `}
    >
      {/* User Info Block */}
      <div className="text-text-main text-md border-b border-[#2d2d2d] pb-4 whitespace-nowrap">
        Welcome, "Logged in user"
      </div>

      {/* Tabs list */}
      <div className="text-md mt-6 flex flex-col gap-y-3 flex-1">
        <Button variant="ghost" className="text-left justify-start w-full text-text-main hover:bg-[#2d2d2d]" asChild>
          <Link className="flex gap-x-2 items-center" to="/overview">
            <span>Overview</span>
          </Link>
        </Button>
        <Button variant="ghost" className="text-left justify-start w-full text-text-main hover:bg-[#2d2d2d]" asChild>
          <Link className="flex gap-x-2 items-center" to="/tasks">
            <Clipboard className="h-5 w-5" />
            <span>Tasks</span>
          </Link>
        </Button>
        <Button variant="ghost" className="text-left justify-start w-full text-text-main hover:bg-[#2d2d2d]" asChild>
          <Link className="flex gap-x-2 items-center" to="/waste">
            <RecycleIcon className="h-5 w-5" />
            <span>Waste</span>
          </Link>
        </Button>
      </div>

      {/* Footer Profile Block */}
      <div className="flex items-center justify-between py-4 mt-auto border-t border-[#2d2d2d] whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">PFP</div>
          <div className="text-sm text-text-main font-medium">NAME ID</div>
        </div>
        <Button variant="ghost" className="h-9 w-9 p-0 text-text-main hover:bg-[#2d2d2d]" asChild>
          <Link to="/settings" className="flex items-center justify-center">
            <Settings2Icon className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </aside>
  );
};