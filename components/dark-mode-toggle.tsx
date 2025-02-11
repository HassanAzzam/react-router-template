import { Moon, Settings, Sun } from 'lucide-react'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'
import { Theme, useTheme } from 'remix-themes'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function DarkModeToggle() {
  const [, setTheme] = useTheme()

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
        <DropdownMenuItem onClick={() => setTheme(null)}>
          <Settings /> System
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(Theme.LIGHT)}
          className="light:bg-accent light:text-[accent]"
        >
          <Sun /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(Theme.DARK)}
          className="dark:bg-accent dark:text-[accent]"
        >
          <Moon /> Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
