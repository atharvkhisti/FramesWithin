import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserSettings {
  // API Keys
  openaiApiKey: string | null
  hasSetApiKey: boolean
  apiKeySkipped: boolean
  
  // Preferences
  emailNotifications: boolean
  weeklyInsights: boolean
  autoSave: boolean
  autoExport: boolean
  
  // Advanced Settings
  preferredExportFormat: 'png' | 'jpg' | 'webp'
  imageQuality: number // 1-100
  enableAdvancedControls: boolean
  
  // Actions
  setOpenAIApiKey: (key: string) => void
  clearOpenAIApiKey: () => void
  setApiKeySkipped: (skipped: boolean) => void
  updatePreference: (key: string, value: boolean | string | number) => void
  resetSettings: () => void
}

const defaultSettings = {
  openaiApiKey: null,
  hasSetApiKey: false,
  apiKeySkipped: false,
  emailNotifications: true,
  weeklyInsights: true,
  autoSave: true,
  autoExport: false,
  preferredExportFormat: 'png' as const,
  imageQuality: 90,
  enableAdvancedControls: true,
}

export const useSettingsStore = create<UserSettings>()(
  persist(
    (set) => ({
      ...defaultSettings,
      
      setOpenAIApiKey: (key: string) => set({ 
        openaiApiKey: key,
        hasSetApiKey: true,
        apiKeySkipped: false
      }),
      
      clearOpenAIApiKey: () => set({ 
        openaiApiKey: null,
        hasSetApiKey: false
      }),
      
      setApiKeySkipped: (skipped: boolean) => set({ 
        apiKeySkipped: skipped
      }),
      
      updatePreference: (key: string, value: boolean | string | number) => set((state) => ({
        ...state,
        [key]: value
      })),
      
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'frameswithin-settings',
    }
  )
)
