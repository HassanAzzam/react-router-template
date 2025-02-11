import type { Meta, StoryObj } from '@storybook/react'

import { Navbar } from '../components/navbar'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Navbar> = {
  component: Navbar,
}

export default meta
type Story = StoryObj<typeof Navbar>

export const FirstStory: Story = {
  args: {},
}
