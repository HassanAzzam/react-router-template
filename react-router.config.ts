import { vercelPreset } from '@vercel/react-router/vite';
import type {Config} from '@react-router/dev/config';

export default {
	appDirectory: 'app',
	ssr: true,
    presets: [vercelPreset()],
} satisfies Config;
