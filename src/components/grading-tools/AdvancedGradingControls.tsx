"use client"

import { SliderControl } from './SliderControl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Sun, 
  Thermometer,
  Zap
} from 'lucide-react'

interface AdvancedGradingControlsProps {
  settings: {
    brightness: number
    contrast: number
    saturation: number
    hue: number
    temperature: number
    vibrance: number
    exposure: number
    shadows: number
    highlights: number
    clarity: number
  }
  onChange: (key: string, value: number) => void
}

export function AdvancedGradingControls({ settings, onChange }: AdvancedGradingControlsProps) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="advanced">
          Advanced
          <Badge variant="secondary" className="ml-2 h-4 text-[10px] px-1">Pro</Badge>
        </TabsTrigger>
        <TabsTrigger value="creative">Creative</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span>Basic Adjustments</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SliderControl
              label="Brightness"
              value={settings.brightness}
              onChange={(val) => onChange('brightness', val)}
              min={-100}
              max={100}
            />
            
            <SliderControl
              label="Contrast"
              value={settings.contrast}
              onChange={(val) => onChange('contrast', val)}
              min={-100}
              max={100}
            />
            
            <SliderControl
              label="Saturation"
              value={settings.saturation}
              onChange={(val) => onChange('saturation', val)}
              min={-100}
              max={100}
            />
            
            <SliderControl
              label="Hue"
              value={settings.hue}
              onChange={(val) => onChange('hue', val)}
              min={-100}
              max={100}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="advanced" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>Advanced Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SliderControl
              label="Exposure"
              value={settings.exposure}
              onChange={(val) => onChange('exposure', val)}
              min={-100}
              max={100}
            />
            
            <SliderControl
              label="Shadows"
              value={settings.shadows}
              onChange={(val) => onChange('shadows', val)}
              min={-100}
              max={100}
            />
            
            <SliderControl
              label="Highlights"
              value={settings.highlights}
              onChange={(val) => onChange('highlights', val)}
              min={-100}
              max={100}
            />
            
            <SliderControl
              label="Clarity"
              value={settings.clarity}
              onChange={(val) => onChange('clarity', val)}
              min={-100}
              max={100}
            />
            
            <SliderControl
              label="Vibrance"
              value={settings.vibrance}
              onChange={(val) => onChange('vibrance', val)}
              min={-100}
              max={100}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="creative" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span>Creative Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SliderControl
              label="Temperature"
              value={settings.temperature}
              onChange={(val) => onChange('temperature', val)}
              min={-100}
              max={100}
            />
            
            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Quick Presets</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onChange('temperature', -30)
                    onChange('contrast', 15)
                  }}
                  className="px-3 py-2 rounded-lg border border-border hover:bg-secondary/50 text-sm text-left"
                >
                  <div className="font-medium">Cool Cinematic</div>
                  <div className="text-xs text-muted-foreground">Blue tones</div>
                </button>
                <button
                  onClick={() => {
                    onChange('temperature', 30)
                    onChange('saturation', 20)
                  }}
                  className="px-3 py-2 rounded-lg border border-border hover:bg-secondary/50 text-sm text-left"
                >
                  <div className="font-medium">Warm Glow</div>
                  <div className="text-xs text-muted-foreground">Golden hour</div>
                </button>
                <button
                  onClick={() => {
                    onChange('saturation', -80)
                    onChange('contrast', 20)
                  }}
                  className="px-3 py-2 rounded-lg border border-border hover:bg-secondary/50 text-sm text-left"
                >
                  <div className="font-medium">Monochrome</div>
                  <div className="text-xs text-muted-foreground">B&W style</div>
                </button>
                <button
                  onClick={() => {
                    onChange('vibrance', 40)
                    onChange('clarity', 25)
                  }}
                  className="px-3 py-2 rounded-lg border border-border hover:bg-secondary/50 text-sm text-left"
                >
                  <div className="font-medium">Vibrant Pop</div>
                  <div className="text-xs text-muted-foreground">Instagram style</div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
