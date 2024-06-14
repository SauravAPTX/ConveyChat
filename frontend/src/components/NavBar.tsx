"use client"
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/NavMenu";
import { cn } from "../utils/cn";
import Link from "next/link";
import { useDarkMode } from './ui/darkmode';

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>("/home"); 
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const handleSwitch = () => {
    const newRoute = currentRoute === "/" ? "/home" : "/";
    // console.log(newRoute);
    setCurrentRoute(newRoute);
  };
  const handleLogout = () => {
    const newRoute = currentRoute === "/" ? "/home" : "/";
    // console.log(newRoute);
    setCurrentRoute(newRoute);
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}> 
            <button className="absolute left-4 top-3 text-lg font-bold text-purple-500 z-50  px-2 py-2.5">
        <Link href="/">Convey</Link>
      </button>
           <Menu setActive={setActive}>
        
        
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
      <div className="absolute right-4 top-3 text-lg font-bold text-purple-500">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <button className="px-2 py-2.5">
        <Link href="/main">App</Link>
      </button>
      <button className="px-2 py-2.5">
        <Link href="/#join">Join</Link>
      </button>
      <button className="px-2 py-2.5" onClick={handleLogout}>
        <Link href={currentRoute}>Logout</Link>
      </button>
      <button className="px-2 py-2.5" onClick={handleSwitch}>
        <Link href={currentRoute}>Switch!</Link>
      </button>
      </div>
    </div>
  );
}