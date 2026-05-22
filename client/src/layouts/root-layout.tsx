// src/layouts/RootLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar/navbar";
import { Sidebar } from "@/components/sidebar/sidebar"; // We'll create this clean file next

export const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#141414]">
      {/* 1. Top Bar stays completely isolated up top */}
      <Navbar toggleMenu={toggleMenu} />
      
      {/* 2. The Row Wrapper - Restricts child constraints natively */}
      <div className="flex flex-1 h-[calc(100vh-64px)] mt-16 relative z-0 w-full overflow-hidden">
        
        {/* 3. Sidebar sits side-by-side with main */}
        <Sidebar isOpen={isOpen} />

        {/* 4. Main window dynamically shrinks to fit perfectly */}
        <main className="flex-1 h-full overflow-auto text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};