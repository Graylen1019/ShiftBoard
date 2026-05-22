// src/components/navbar/navbar.tsx
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

interface NavbarProps {
  toggleMenu: () => void;
}

export const Navbar = ({ toggleMenu }: NavbarProps) => {
  return (
    <nav className="bg-panel-bg h-16 shadow-[0_8px_24px_rgba(0,0,0,0.7)] fixed top-0 left-0 right-0 z-30 flex items-center px-4 gap-4">
      <Button
        variant="ghost"
        onClick={toggleMenu}
        className="h-9 w-9 p-0 text-white hover:bg-[#2d2d2d]"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2 select-none">
        <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
        <span className="text-white font-bold text-lg">ShiftBoard</span>
      </div>
    </nav>
  );
};