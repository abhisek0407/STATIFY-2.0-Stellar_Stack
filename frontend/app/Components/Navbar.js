"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-[#09041b] top-0 sticky z-50 backdrop-blur-md border-b border-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/TeamLogo.png"
            alt="FantasyPilot Logo"
            width={60}
            height={60}
            className="rounded-xl"
            priority
          />
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              FantasyPilot
            </h1>

            <p className="text-xs text-gray-300 tracking-wide">
              AI Powered Fantasy Cricket Assistant
            </p>
          </div>
        </div>
        <div>
          <ul className="hidden lg:flex items-center gap-10 text-white font-medium">
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2 hover:scale-105">
              <Link href="/">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
              </Link>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2 hover:scale-105">
              <i className="fa-solid fa-trophy"></i>
              <span>Matches</span>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2 hover:scale-105">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Features</span>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2 hover:scale-105">
              <i className="fa-solid fa-robot"></i>
              <span>How it Works</span>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2 hover:scale-105 ">
              <i className="fa-solid fa-envelope"></i>
              <span>Contact</span>
            </li>
          </ul>
        </div>
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i
            className={
              menuOpen
                ? "fa-solid fa-xmark text-white"
                : "fa-solid fa-bars text-white"
            }
          ></i>
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-[#09041b] text-white">
          <ul className="flex flex-col items-center gap-5 py-6 font-bold">
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2">
              <i className="fa-solid fa-house"></i>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2">
              <i className="fa-solid fa-trophy"></i>
              <p onClick={() => setMenuOpen(false)}>Matches</p>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Features
              </Link>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2">
              <i className="fa-solid fa-robot"></i>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                How it works
              </Link>
            </li>
            <li className="cursor-pointer hover:text-cyan-400 transition duration-300 flex items-center gap-2">
              <i className="fa-solid fa-envelope"></i>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
