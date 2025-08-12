import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async getAll() {
        try {
          const store = await cookies()
          return store.getAll()
        } catch {
          return []
        }
      },
      async setAll(cookiesToSet) {
        try {
          const store = await cookies()
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
        } catch {
          // Ignore in read-only Server Components; middleware should refresh sessions.
        }
      },
    },
  })
}
