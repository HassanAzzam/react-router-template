import type { Config } from '@react-router/dev/config'
import { vercelPreset } from '@vercel/react-router/vite'

export default {
  appDirectory: 'app',
  ssr: true,
  presets: process.env.VERCEL ? [vercelPreset()] : [],
} satisfies Config
