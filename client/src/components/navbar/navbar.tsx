import {
  Clipboard,
  Menu,
  PaperclipIcon,
  RecycleIcon,
  Settings2Icon,
  ZoomInIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 1. TOP NAVBAR - High elevation layer with an aggressive custom dark drop shadow */}
      <nav className="bg-panel-bg h-16 shadow-[0_8px_24px_rgba(0,0,0,0.7)] fixed top-0 left-0 right-0 z-30 flex items-center px-4 gap-4">
        {/* Toggle Button */}
        <Button variant={"ghost"} onClick={toggleMenu} asChild>
          <Menu size={48} />
        </Button>

        {/* Branding/Logo */}
        <div className="flex items-center gap-2 select-none">
          <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
          <span className="text-white font-bold text-lg">ShiftBoard</span>
        </div>
      </nav>

      {/* 2. SIDEBAR - Sits on a lower layer (z-10), allowing the navbar's heavy shadow to cut over it violently */}
      <aside
        className={`fixed top-16 left-0 z-10 w-67.5 h-[calc(100vh-64px)] bg-panel-bg border-r border-[#2d2d2d] transition-transform duration-300 ease-in-out overflow-y-auto px-4 py-5
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* User */}
        <div className="text-text-main text-xl border-b-2 py-6">
          Welcome, {/*TODO:*/}"User"
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-y-6 border-b-2 py-8">
          <Button
            asChild
            variant={"secondary"}
            className="text-left justify-start flex items-center "
          >
            <a className="flex gap-x-2" href="/">
              <ZoomInIcon size={24} className="size-5" />
              <div className="text-md">Overview</div>
            </a>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            className="text-left justify-start"
          >
            <a className="flex gap-x-2 w-full" href="/tasks">
              <Clipboard className="size-5" />
              <div className="text-md">Tasks</div>
            </a>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            className="text-left justify-start"
          >
            <a className="flex gap-x-2 w-full" href="/waste">
              <RecycleIcon className="size-5" />
              <div className="text-md">Waste</div>
            </a>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            className="text-left justify-start"
          >
            <a className="flex gap-x-2 w-full" href="/reports">
              <PaperclipIcon className="size-5" />
              <div className="text-md">Reports</div>
            </a>
          </Button>
        </div>
        {/* Sign out/settings */}
        <div className="flex gap-2 py-6">
          {/* TODO: */}
          <div>PFP</div>
          <div>NAME ID</div>
          <Button asChild variant={"ghost"} className="ml-19">
            <a href="/settings">
              <Settings2Icon className="size-6" />
            </a>
          </Button>
        </div>
      </aside>
    </>
  );
};
