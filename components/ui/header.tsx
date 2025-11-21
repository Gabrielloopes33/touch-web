"use client";
import React from "react";

import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from './theme-toggle';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex fixed top-10 left-2 right-5 md:left-5 md:right-5 bg-white/1 z-50 py-3 md:gap-20">
      <div className="flex mx-auto max-w-1xl px-10 sm:px-6 md:gap-8 w-full">
        <div className="relative flex h-16 items-center justify-between w-full rounded-3xl bg-white/90 px-10 shadow-lg shadow-black/[0.03] backdrop-blur-sm">
          {/* Botão Hambúrguer - Mobile */}
          <button className="md:hidden flex" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger-icon">
              <div className="w-5 h-0.5 bg-black mb-1"></div>
              <div className="w-5 h-0.5 bg-black mb-1"></div>
              <div className="w-5 h-0.5 bg-black"></div>
            </span>
          </button>

          {/* Site Branding */}
          <div className="flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link href="/" className="block" aria-label="Touch">
              <Image
                src="/images/logo-full.svg"
                width={80}
                height={24}
                alt="Logo"
                priority
                className="w-12 md:w-16 lg:w-20"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav
            className={`
              flex-col md:flex-row flex justify-end items-center
              gap-4 md:gap-3
              ${menuOpen ? "flex" : "hidden"}
              md:flex
              absolute md:static top-12 left-0 w-full md:w-auto bg-white md:bg-transparent rounded-b-2xl shadow-lg md:shadow-none z-20
              py-4 md:py-0
              transition-all
            `}
          >
            <ThemeToggle />

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50 whitespace-nowrap text-sm px-3 py-1.5">
                  Soluções
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/solucoes/atendimento-automatico-ia"
                          className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                        >
                          Atendimento Automático IA
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link
              href="/Port"
              className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50 whitespace-nowrap text-sm px-3 py-1.5"
            >
              Portfólio
            </Link>
            <Link
              href="/signin"
              className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900 whitespace-nowrap text-sm px-3 py-1.5"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
