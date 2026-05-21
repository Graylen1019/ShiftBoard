import { Menu } from "lucide-react";
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
        <Button
          variant="ghost"
          onClick={toggleMenu}
          className="h-9 w-9 p-0 text-white hover:bg-[#2d2d2d]"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Branding/Logo */}
        <div className="flex items-center gap-2 select-none">
          <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
          <span className="text-white font-bold text-lg">ShiftBoard</span>
        </div>
      </nav>

      {/* 2. SIDEBAR - Sits on a lower layer (z-10), allowing the navbar's heavy shadow to cut over it violently */}
      <aside
        className={`fixed top-16 left-0 z-10 w-67.5 h-[calc(100vh-64px)] bg-panel-bg border-r border-[#2d2d2d] transition-transform duration-300 ease-in-out overflow-y-auto px-4 py-2
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="text-text-main text-md border-b-2 py-2">
          Welcome, {/*TODO:*/}"Logged in user"
        </div>
      </aside>
    </>
  );
};
