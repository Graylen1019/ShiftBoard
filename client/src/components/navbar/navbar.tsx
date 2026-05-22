import {
  BellIcon,
  Calendar1,
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
      <nav className="bg-panel-bg h-16 shadow-[0_8px_24px_rgba(0,0,0,0.7)] fixed top-0 left-0 right-0 z-30 flex items-center pl-1 pr-10 justify-between">
        <div className="flex items-center gap-x-6">
          {/* Toggle Button */}
          <Button variant={"ghost"} onClick={toggleMenu} asChild>
            <Menu className="size-12"/>
          </Button>

          {/* Branding/Logo */}
          <div className="flex items-center gap-2 select-none">
            <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
            <div className="text-white font-bold text-lg">ShiftBoard</div>
          </div>
        </div>
        {/* notifications and 7 day graph */}
        <div className="flex text-center items-center justify-center gap-x-6">
          <div className="w-full">
            <BellIcon className="size-6" />
          </div>
          <div className="flex items-center gap-3">
            {/* this will be a percentage of tasks done in past 7 days */}
            <Calendar1 className="size-7" />
            <div>70%</div>
          </div>
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
            <a className="flex gap-x-2" href="/overview">
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
        <div className="flex items-center gap-2 py-6 text-xl">
          {/* TODO: */}
          <div className="text-sm">Bigelow, Graylen <span className="text-xs">(ea888888)</span></div>
          <Button asChild variant={"ghost"} className="ml-6">
            <a href="/settings">
              <Settings2Icon className="size-6" />
            </a>
          </Button>
        </div>
      </aside>
    </>
  );
};
