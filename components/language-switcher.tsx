'use client'
import { Globe } from 'lucide-react'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  function onChange(lang?: string) {
    void fetch('/action/set-language', { method: 'post', body: JSON.stringify({ lang }) })
    void i18n.changeLanguage(lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.5rem] w-[1.5rem] transition-all" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onChange('ar')} className="ar:bg-accent ar:text-[accent]">
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange('en')} className="en:bg-accent en:text-[accent]">
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
