import {
  Links,
  type LinksFunction,
  type LoaderFunctionArgs,
  Meta,
  type Route,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router'
import { Outlet } from 'react-router'

import './style.css'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'
import i18next from './i18next.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request)
  return {
    locale,
  }
}

export const handle = {
  i18n: 'common',
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
  const { locale } = useRouteLoaderData<typeof loader>('root') as any
  const { i18n } = useTranslation()
  useChangeLanguage(locale)

  return (
    <html lang={locale.lang} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
  return <AppLayout>{children}</AppLayout>
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
