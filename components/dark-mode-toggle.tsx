'use client'

import clsx from 'clsx'
import { Moon, Settings, Sun } from 'lucide-react'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const selectedItemClass = clsx('bg-accent text-[accent]')
const LOCAL_STORAGE_KEY = 'color-scheme'
const getCurrentColorScheme = () => window.localStorage.getItem(LOCAL_STORAGE_KEY)
const setCurrentColorScheme = (colorScheme: string | null) =>
  colorScheme
    ? window.localStorage.setItem(LOCAL_STORAGE_KEY, colorScheme)
    : window.localStorage.removeItem(LOCAL_STORAGE_KEY)

function usePrefersDarkColorScheme() {
  const [state, setState] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (event) => setState(event.matches))
    setState(mediaQuery.matches)
  }, [])
  return state
}

export function DarkModeToggle() {
  const [selected, setSelected] = useState<string | null>(null)
  const doesPreferDarkColorScheme = usePrefersDarkColorScheme()

  useEffect(() => {
    setSelected(getCurrentColorScheme())
  }, [])

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    if (selected) {
      document.body.classList.add(selected)
    } else if (doesPreferDarkColorScheme) {
      document.body.classList.add('dark')
    }
  }, [selected, doesPreferDarkColorScheme])

  function onChange(colorScheme: string | null) {
    setCurrentColorScheme(colorScheme)
    setSelected(colorScheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="dark:-rotate-90 h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:scale-0" />
          <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onChange(null)}
          className={selected == null ? selectedItemClass : ''}
        >
          <Settings /> System
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange('light')}
          className={selected === 'light' ? selectedItemClass : ''}
        >
          <Sun /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange('dark')}
          className={selected === 'dark' ? selectedItemClass : ''}
        >
          <Moon /> Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
