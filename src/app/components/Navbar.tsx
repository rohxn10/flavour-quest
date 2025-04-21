'use client';
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-orange-500 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link href="/">Recipe Finder</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/recipes">Recipes</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>

        {/* Hamburger */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col space-y-4 mt-4 text-white font-medium px-4">
          <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link href="/recipes" onClick={() => setIsOpen(false)}>Recipes</Link></li>
          <li><Link href="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
          <li><Link href="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
