"use client";
import React from "react";

import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      } else {
        setDarkMode(false)
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      <div className="flex items-center gap-2">
        {darkMode ? (
          <>
            <SunIcon className="h-4 w-4" />
            <span>Light</span>
          </>
        ) : (
          <>
            <MoonIcon className="h-4 w-4" />
            <span>Dark</span>
          </>
        )}
      </div>
    </button>
  )
} 