import { GalleryVerticalEnd } from 'lucide-react'

import { DarkModeToggle } from '@/components/dark-mode-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { LoginForm } from '@/components/login-form'
import { Link, type MetaFunction, data, redirect } from 'react-router'
import i18next from '~/localization/i18next.server'
import { commitSession, getSession } from '~/sessions.server'
import type { Route } from './+types/login'

export const handle = { i18n: 'auth' }

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('userId')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/')
  }

  const t = await i18next.getFixedT(request, 'auth')
  const title = t('page_title')

  return data(
    { error: session.get('error'), title },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  )
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const form = await request.formData()
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const username = form.get('username')
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const password = form.get('password')

  const userId = 'my-user-uuid' //await validateCredentials(username, password)

  if (userId == null) {
    session.flash('error', 'Invalid username/password')

    // Redirect back to the login page with errors.
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  session.set('userId', userId)

  // Login succeeded, send them to the home page.
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }: any) => {
  const { title } = data
  return [{ title }]
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex w-full justify-between gap-2">
          <Link to="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </Link>

          <div className="flex items-center gap-2 px-4">
            <DarkModeToggle />
            <LanguageSwitcher />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm method="post" />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login-background.jpg"
          alt="login background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
