'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  type DropdownMenuProps,
  DropdownTrigger,
  type SwitchProps,
} from '@heroui/react'
import type { FC } from 'react'

import { useTheme } from '@heroui/use-theme'

export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme('system')

  const onChange: DropdownMenuProps['onAction'] = (key) => {
    setTheme(key.toString())
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Theme</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dark mode" onAction={onChange} selectedKeys={[theme]}>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="light">Light</DropdownItem>
        <DropdownItem key="dark">Dark</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
