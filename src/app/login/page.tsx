"use client";

import { useEffect, useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  // const router = useRouter()
  // const search = useSearchParams()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Handle OAuth/Magic link callback automatically via middleware cookies refresh
    // Nothing needed here beyond optional messages.
  }, [])

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      setMessage('Check your email for a login link')
  } catch {
      setMessage('Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={sendMagicLink} className="space-y-3">
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {loading ? 'Sending…' : 'Send Magic Link'}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  )
}
