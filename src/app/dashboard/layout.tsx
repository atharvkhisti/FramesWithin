"use client"

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { ApiKeyDialog } from '@/components/api-key-dialog'
import { useSettingsStore } from '@/lib/settings-store'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)
  const { hasSetApiKey, apiKeySkipped, setOpenAIApiKey } = useSettingsStore()

  useEffect(() => {
    // Show dialog if user hasn't set API key and hasn't skipped
    if (!hasSetApiKey && !apiKeySkipped) {
      const timer = setTimeout(() => {
        setShowApiKeyDialog(true)
      }, 1000) // Show after 1 second
      return () => clearTimeout(timer)
    }
  }, [hasSetApiKey, apiKeySkipped])

  const handleSaveApiKey = (apiKey: string) => {
    setOpenAIApiKey(apiKey)
  }

  return (
    <>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
      
      <ApiKeyDialog 
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        onSave={handleSaveApiKey}
      />
    </>
  )
} 