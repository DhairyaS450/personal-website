import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // Avoid logic between createServerClient and getUser
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Optionally gate admin/editor routes
  const path = request.nextUrl.pathname
  const requiresAuth = path.startsWith('/blog/editor')

  if (requiresAuth && !user) {
    // redirect to /login with redirect param
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', path)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    // Run on routes that need Supabase cookies refreshed
    '/((?!_next/static|_next/image|favicon.ico|images|public|api/chat|api/contact|api/auth).*)',
  ],
}
