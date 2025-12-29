'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './supabase'

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if Supabase is configured
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl === 'your_supabase_project_url' || 
      supabaseAnonKey === 'your_supabase_anon_key') {
    // Return a mock client for development without Supabase
    return null
  }

  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(
      supabaseUrl,
      supabaseAnonKey
    )
  }
  
  return supabaseClient
}
