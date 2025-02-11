import { createCookieSessionStorage } from 'react-router'
import { type Theme, createThemeSessionResolver } from 'remix-themes'

type SessionData = {
  userId: string
}

type SessionFlashData = {
  error: string
}

const isProduction = process.env.NODE_ENV === 'production'

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60_000,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET || 'SESSION_SECRET'],
    ...(isProduction
      ? {
          domain: process.env.VERCEL ? process.env.VERCEL_URL : process.env.HOST,
          secure: true,
        }
      : {}),
  },
})

const themeCookie = createCookieSessionStorage<{ colorScheme: Theme | null }, SessionFlashData>({
  cookie: {
    name: '__theme',
    httpOnly: true,
    maxAge: 60_000,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET || 'SESSION_SECRET'],
    ...(isProduction
      ? {
          domain: process.env.VERCEL ? process.env.VERCEL_URL : process.env.HOST,
          secure: true,
        }
      : {}),
  },
})

export const i18nCookieSessionStorage = createCookieSessionStorage<
  { lng: string },
  SessionFlashData
>({
  cookie: {
    name: '_i18n',
    httpOnly: true,
    maxAge: 60_000,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET || 'SESSION_SECRET'],
    ...(isProduction
      ? {
          domain: process.env.VERCEL ? process.env.VERCEL_URL : process.env.HOST,
          secure: true,
        }
      : {}),
  },
})

export { getSession, commitSession, destroySession }
export const themeSessionResolver = createThemeSessionResolver(themeCookie)
