#!/usr/bin/env node
/*
  Set a Supabase user's app_metadata.role = 'admin'
  Usage (PowerShell):
    $env:SUPABASE_URL="https://xyz.supabase.co"; $env:SUPABASE_SERVICE_ROLE_KEY="..."; node scripts/set-admin-role.js user@example.com
*/
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

async function main() {
  const emailOrId = process.argv[2]
  if (!emailOrId) {
    console.error('Usage: node scripts/set-admin-role.js <email-or-user-id>')
    process.exit(1)
  }

  // Allow CLI flags --url and --key
  const argv = process.argv.slice(2)
  const getFlag = (name) => {
    const idx = argv.findIndex((a) => a === `--${name}`)
    return idx >= 0 && argv[idx + 1] ? argv[idx + 1] : undefined
  }

  const flagUrl = getFlag('url')
  const flagKey = getFlag('key')

  const url = flagUrl || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  // Require the new named secret. Example: SUPABASE_SECRET_DEFAULT
  const serviceKey = flagKey || process.env.SUPABASE_SECRET_DEFAULT
  if (!url) {
    console.error('Missing SUPABASE_URL env var')
    console.error('Provide via .env, PowerShell env, or --url flag')
    process.exit(1)
  }
  if (!serviceKey) {
    console.error('Missing SUPABASE_SECRET_DEFAULT (named secret)')
    console.error('Provide via .env, PowerShell env, or --key flag')
    process.exit(1)
  }

  const admin = createClient(url, serviceKey)

  // Try to treat arg as UUID first
  let userId = emailOrId
  let user = null

  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidV4Regex.test(emailOrId)) {
    // Not a UUID; search by email via listUsers
    console.log(`Looking up user by email: ${emailOrId}`)
    let page = 1
    const perPage = 100
    while (!user) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
      if (error) throw error
      const match = data.users.find((u) => (u.email || '').toLowerCase() === emailOrId.toLowerCase())
      if (match) {
        user = match
        userId = match.id
        break
      }
      if (data.users.length < perPage) break
      page += 1
    }
    if (!user) {
      console.error('User not found by email')
      process.exit(1)
    }
  } else {
    const { data, error } = await admin.auth.admin.getUserById(userId)
    if (error || !data?.user) {
      console.error('User not found by id')
      process.exit(1)
    }
    user = data.user
  }

  const currentApp = user.app_metadata || {}
  const nextApp = { ...currentApp, role: 'admin' }
  console.log(`Updating user ${userId} (${user.email}) app_metadata ->`, nextApp)
  const { data: updated, error: updateErr } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: nextApp,
  })
  if (updateErr) {
    console.error('Failed to update user metadata:', updateErr)
    process.exit(1)
  }
  console.log('Success. app_metadata:', updated.user.app_metadata)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
