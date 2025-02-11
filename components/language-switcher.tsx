'use client'
import clsx from 'clsx'
import { Globe } from 'lucide-react'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const selectedItemClass = clsx('bg-accent text-[accent]')

export function LanguageSwitcher() {
  const [selected, setSelected] = useState<string>()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setSelected('ar')
  }, [])

  function onChange(lang?: string) {
    void i18n.changeLanguage(lang)
    setSelected(lang)
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
        <DropdownMenuItem
          onClick={() => onChange('ar')}
          className={selected === 'ar' ? selectedItemClass : ''}
        >
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange('en')}
          className={selected === 'en' ? selectedItemClass : ''}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
