import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          subscription_tier: 'basic' | 'pro' | null
          subscription_status: 'active' | 'inactive' | null
          usage_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          subscription_tier?: 'basic' | 'pro' | null
          subscription_status?: 'active' | 'inactive' | null
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscription_tier?: 'basic' | 'pro' | null
          subscription_status?: 'active' | 'inactive' | null
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      uploads: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_url: string
          file_type: 'image' | 'video'
          thumbnail_url: string | null
          color_palette: string[] | null
          font_data: string | null
          grading_data: string | null
          ai_suggestions: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_url: string
          file_type: 'image' | 'video'
          thumbnail_url?: string | null
          color_palette?: string[] | null
          font_data?: string | null
          grading_data?: string | null
          ai_suggestions?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_url?: string
          file_type?: 'image' | 'video'
          thumbnail_url?: string | null
          color_palette?: string[] | null
          font_data?: string | null
          grading_data?: string | null
          ai_suggestions?: string | null
          created_at?: string
        }
      }
      presets: {
        Row: {
          id: string
          user_id: string
          name: string
          grading_data: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          grading_data: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          grading_data?: string
          created_at?: string
        }
      }
    }
  }
} 