'use client'

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
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
} 