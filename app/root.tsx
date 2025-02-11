import {
  Links,
  type LinksFunction,
  type LoaderFunctionArgs,
  Meta,
  type Route,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from 'react-router'
import { Outlet } from 'react-router'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'

import './style.css'
import { clsx } from 'clsx'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'
import { themeSessionResolver } from '~/sessions.server'
import i18next from './localization/i18next.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)

  const locale = await i18next.getLocale(request)
  return {
    locale,
    theme: getTheme(),
  }
}

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function AppLayout({ children }: Route.ComponentProps) {
  const data = useRouteLoaderData<typeof loader>('root') as any
  const [theme] = useTheme()
  const { i18n } = useTranslation('common')
  useChangeLanguage(data.locale)

  return (
    <html lang={i18n.language} dir={i18n.dir()} className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="ar:font-rubik en:font-geist">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={theme ?? null} themeAction="/action/set-theme">
      <AppLayout>{children}</AppLayout>
    </ThemeProvider>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
