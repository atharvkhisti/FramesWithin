"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAppStore } from '@/lib/store'
import { Sparkles, Sun, Contrast, Thermometer, Droplets, Lightbulb } from 'lucide-react'

export default function BreakdownPanel() {
  const breakdown = useAppStore((s) => s.gradingBreakdown)

  if (!breakdown) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            AI Grading Breakdown
          </CardTitle>
          <CardDescription>
            Upload an image to get AI-powered grading analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No breakdown available</p>
            <p className="text-sm mt-1">Upload an image to generate AI analysis</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const settings = [
    { 
      label: 'Temperature', 
      value: breakdown.temperature, 
      icon: Thermometer,
      color: 'text-orange-500',
      description: 'Color temperature (Kelvin)'
    },
    { 
      label: 'Tint', 
      value: breakdown.tint, 
      icon: Contrast,
      color: 'text-blue-500',
      description: 'Green/Magenta tint balance'
    },
    { 
      label: 'Saturation', 
      value: breakdown.saturation, 
      icon: Droplets,
      color: 'text-pink-500',
      description: 'Color intensity and vibrancy'
    },
    { 
      label: 'Exposure', 
      value: breakdown.exposure, 
      icon: Sun,
      color: 'text-yellow-500',
      description: 'Overall exposure level'
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          AI Grading Breakdown
        </CardTitle>
        <CardDescription>
          AI-analyzed color grading recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Grading Values */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">Recommended Settings</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {settings.map((setting) => (
              <div key={setting.label} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <setting.icon className={`w-4 h-4 ${setting.color}`} />
                    <span className="text-sm font-medium">{setting.label}</span>
                  </div>
                  <span className="text-lg font-bold">{setting.value ?? 0}</span>
                </div>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
                {/* Progress bar */}
                <div className="mt-2 w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(Math.max((setting.value ?? 0) + 50, 0), 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 