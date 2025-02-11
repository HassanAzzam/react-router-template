import { DarkModeToggle } from '@/components/dark-mode-toggle'
import { render } from '@testing-library/react'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'
import { ThemeProvider } from 'remix-themes'

describe('DarkModeToggle', () => {
  it('Component mounts properly', () => {
    // @ts-ignore
    const wrapper = render(<DarkModeToggle />, { wrapper: ThemeProvider })
    expect(wrapper).toBeTruthy()

    const buttonChildren = wrapper.container.querySelectorAll('button > *')
    expect(buttonChildren).toBeTruthy()
    expect(buttonChildren[0]).toHaveClass('lucide-sun')
    expect(buttonChildren[1]).toHaveClass('lucide-moon')
    expect(buttonChildren[2]).toHaveClass('sr-only')
    expect(buttonChildren[2].textContent).toBe('Toggle theme')
  })
})
