"use client"

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useStatsStore } from '@/lib/stats-store'

export default function ExportButton() {
  const breakdown = useAppStore((s) => s.gradingBreakdown)
  const { incrementExports } = useStatsStore()

  const exportJSON = () => {
    if (!breakdown) return
    const blob = new Blob([JSON.stringify(breakdown, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'grading-breakdown.json'
    link.click()
    URL.revokeObjectURL(url)
    incrementExports() // Track export
  }

  if (!breakdown) return null

  return (
    <Button onClick={exportJSON} variant="outline" className="mt-4">
      <Download className="w-4 h-4 mr-2" />
      Export Breakdown
    </Button>
  )
} 