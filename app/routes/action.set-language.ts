import type { Route } from '@/.react-router/types/app/routes/+types/login'
import { i18nCookieSessionStorage } from '~/sessions.server'

const { getSession, commitSession } = i18nCookieSessionStorage

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const { lang } = await request.json()

  if (lang == null) {
    session.unset('lng')
  } else {
    session.set('lng', lang)
  }

  return Response.json(
    {},
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  )
}
