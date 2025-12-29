"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Download, 
  Copy,
  Check,
  Thermometer,
  Droplets,
  Eye
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useStatsStore } from '@/lib/stats-store'
import { ColorDistributionBar, ColorWheelVisualization } from '@/components/charts'

export default function PalettePage() {
  const palette = useAppStore((s) => s.palette)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const { incrementExports } = useStatsStore()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const exportPalette = () => {
    if (!palette) return
    
    const paletteData = {
      colors: palette.dominant,
      rgb: palette.rgb,
      hsl: palette.hsl,
      temperature: palette.temperature,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'color-palette.json'
    link.click()
    URL.revokeObjectURL(url)
    incrementExports() // Track export
  }

  const exportPaletteAsPNG = () => {
    const dominant = palette?.dominant;
    if (!dominant) return;
    const swatchWidth = 100;
    const swatchHeight = 100;
    const canvas = document.createElement('canvas');
    canvas.width = swatchWidth * dominant.length;
    canvas.height = swatchHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    dominant.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * swatchWidth, 0, swatchWidth, swatchHeight);
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'color-palette.png';
        link.click();
        URL.revokeObjectURL(url);
        incrementExports() // Track export
      }
    });
  };

  if (!palette) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Color Palette</h1>
          <p className="text-muted-foreground">
            Extract and analyze color palettes from your content
          </p>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Palette className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Palette Available</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Upload an image or video in the Upload & Grade section to automatically extract a color palette.
            </p>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-cyan-500">
              <a href="/dashboard/upload">Go to Upload</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Color Palette</h1>
          <p className="text-muted-foreground">
            Extract and analyze color palettes from your content
          </p>
        </div>
        <Button onClick={exportPalette} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Palette
        </Button>
      </div>

      <Tabs defaultValue="palette" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="palette">Color Palette</TabsTrigger>
          <TabsTrigger value="analysis">Color Analysis</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
        </TabsList>

        <TabsContent value="palette" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-purple-500" />
                <span>Extracted Colors</span>
              </CardTitle>
              <CardDescription>
                Dominant colors from your uploaded content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {palette.dominant.map((color, index) => (
                  <div key={index} className="space-y-3">
                    <div
                      className="w-full h-24 rounded-lg border-2 border-border shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Color {index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(color)}
                        >
                          {copiedColor === color ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs font-mono">{color}</p>
                      <p className="text-xs text-muted-foreground">
                        RGB({palette.rgb[index].r}, {palette.rgb[index].g}, {palette.rgb[index].b})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Color Distribution Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Color Distribution</CardTitle>
              <CardDescription>
                Visual representation of your color palette
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ColorDistributionBar colors={palette.dominant} height={60} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {/* Color Wheel Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Color Wheel Position</CardTitle>
              <CardDescription>
                See where your colors sit on the color wheel
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ColorWheelVisualization hslValues={palette.hsl} size={280} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span>RGB Values</span>
                </CardTitle>
                <CardDescription>
                  Red, Green, Blue color values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {palette.rgb.map((rgb, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: palette.dominant[index] }}
                        />
                        <span className="text-sm font-medium">Color {index + 1}</span>
                      </div>
                      <div className="text-sm font-mono">
                        R: {rgb.r} G: {rgb.g} B: {rgb.b}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-green-500" />
                  <span>HSL Values</span>
                </CardTitle>
                <CardDescription>
                  Hue, Saturation, Lightness color values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {palette.hsl.map((hsl, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: palette.dominant[index] }}
                        />
                        <span className="text-sm font-medium">Color {index + 1}</span>
                      </div>
                      <div className="text-sm font-mono">
                        H: {hsl.h}° S: {hsl.s}% L: {hsl.l}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="temperature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-orange-500" />
                <span>Color Temperature</span>
              </CardTitle>
              <CardDescription>
                Analysis of warm vs cool colors in your palette
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={palette.temperature === 'warm' ? 'default' : 'secondary'}
                    className="text-lg px-4 py-2"
                  >
                    {palette.temperature.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Overall temperature of your palette
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">Warm Colors</h4>
                    <div className="flex space-x-2">
                      {palette.dominant.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reds, oranges, and yellows create a warm, energetic feel
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Cool Colors</h4>
                    <div className="flex space-x-2">
                      {palette.dominant.slice(4).map((color, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Blues, purples, and greens create a calm, soothing feel
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Temperature Tips</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Warm colors are great for energetic, passionate content</li>
                    <li>• Cool colors work well for calm, professional content</li>
                    <li>• Mix warm and cool for balanced, dynamic compositions</li>
                    <li>• Consider your brand colors when choosing temperature</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Palette Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Palette Actions</CardTitle>
          <CardDescription>
            Export and share your color palette
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={exportPalette} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Button variant="outline" onClick={() => copyToClipboard(palette.dominant.join(', '))}>
              <Copy className="w-4 h-4 mr-2" />
              Copy All Colors
            </Button>
            <Button variant="outline">
              <Palette className="w-4 h-4 mr-2" />
              Create Preset
            </Button>
            <Button variant="outline" onClick={exportPaletteAsPNG}>
              <Download className="w-4 h-4 mr-2" />
              Export as PNG
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 