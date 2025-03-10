"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from './theme-toggle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex fixed top-5 left-2 right-5 bg-white/1 z-30 py-4 md:gap-8">
      <div className="flex mx-auto max-w-6xl px-4 sm:px-6 md:gap-8">
        <div className="relative flex h-14 items-center gap-10 justify-between md:gap-20 w-full rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm">
          {/* Botão Hambúrguer */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger-icon">
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </span>
          </button>

          {/* Site Branding */}
          <div className="flex items-center">
            <Link href="/" className="block" aria-label="Cruip">
              <Image
                src="/images/logo-full.svg"
                width={100}
                height={30}
                alt="Logo"
                priority
                className="w-16 md:w-20 lg:w-24"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`flex flex-col md:flex-row flex-1 justify-end items-center gap-6 md:gap-8 ${menuOpen ? "block" : "hidden"} md:block`}>
            <ThemeToggle />
            <Link
              href="/Sobre"
              className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50 whitespace-nowrap text-sm gap-6 md:gap-8"
            >
              Sobre
            </Link>
            <Link
              href="/Port"
              className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50 whitespace-nowrap text-sm"
            >
              Portfólio
            </Link>
            <Link
              href="/signin"
              className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900 whitespace-nowrap text-sm"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
