// Fix for missing types for color-thief-browser
// @ts-expect-error - color-thief-browser doesn't have TypeScript types
import ColorThief from 'color-thief-browser'

export interface ColorPalette {
  dominant: string[]
  rgb: Array<{ r: number; g: number; b: number }>
  hsl: Array<{ h: number; s: number; l: number }>
  temperature: 'warm' | 'cool' | 'neutral'
}

export interface GradingSettings {
  brightness: number
  contrast: number
  saturation: number
  hue: number
  temperature: number
  // Pro features
  hsl?: {
    red: { h: number; s: number; l: number }
    green: { h: number; s: number; l: number }
    blue: { h: number; s: number; l: number }
  }
  toneCurve?: Array<{ x: number; y: number }>
  filmGrain?: number
  glow?: number
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

export function getColorTemperature(r: number, g: number, b: number): 'warm' | 'cool' | 'neutral' {
  const { h } = rgbToHsl(r, g, b)
  
  if (h >= 0 && h <= 60) return 'warm' // Red to Yellow
  if (h >= 60 && h <= 180) return 'cool' // Green to Cyan
  if (h >= 180 && h <= 240) return 'cool' // Cyan to Blue
  if (h >= 240 && h <= 300) return 'cool' // Blue to Magenta
  if (h >= 300 && h <= 360) return 'warm' // Magenta to Red
  
  return 'neutral'
}

// New async palette extraction using color-thief-browser
export async function extractColorPaletteAsync(
  element: HTMLImageElement | HTMLCanvasElement,
  colorCount: number = 10
): Promise<ColorPalette> {
  const colorThief = new ColorThief()
  // color-thief-browser expects an <img> or <canvas>
  let palette: number[][] = []
  try {
    palette = await colorThief.getPalette(element, colorCount)
  } catch {
    // fallback: try getColor if palette fails
    try {
      const color = await colorThief.getColor(element)
      palette = [color]
    } catch {
      palette = [[128,128,128]]
    }
  }
  const dominant = palette.map(([r, g, b]) => rgbToHex(r, g, b))
  const rgbValues = palette.map(([r, g, b]) => ({ r, g, b }))
  const hslValues = rgbValues.map(({ r, g, b }) => rgbToHsl(r, g, b))
  const dominantRgb = rgbValues[0]
  const temperature = getColorTemperature(dominantRgb.r, dominantRgb.g, dominantRgb.b)
  return {
    dominant,
    rgb: rgbValues,
    hsl: hslValues,
    temperature
  }
}

export function applyGradingSettings(
  imageData: ImageData,
  settings: GradingSettings
): ImageData {
  const data = imageData.data
  const newData = new Uint8ClampedArray(data)
  
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]
    
    // Apply basic adjustments
    r = Math.max(0, Math.min(255, r + settings.brightness))
    g = Math.max(0, Math.min(255, g + settings.brightness))
    b = Math.max(0, Math.min(255, b + settings.brightness))
    
    // Apply contrast
    const factor = (259 * (settings.contrast + 255)) / (255 * (259 - settings.contrast))
    r = Math.max(0, Math.min(255, factor * (r - 128) + 128))
    g = Math.max(0, Math.min(255, factor * (g - 128) + 128))
    b = Math.max(0, Math.min(255, factor * (b - 128) + 128))
    
    // Apply saturation
    const hsl = rgbToHsl(r, g, b)
    const newS = Math.max(0, Math.min(100, hsl.s * (1 + settings.saturation / 100)))
    const newRgb = hslToRgb(hsl.h, newS, hsl.l)
    
    r = newRgb.r
    g = newRgb.g
    b = newRgb.b
    
    // Apply hue shift
    const hueShift = settings.hue * 360 / 100
    const newHsl = rgbToHsl(r, g, b)
    const newHue = (newHsl.h + hueShift) % 360
    const newRgb2 = hslToRgb(newHue, newHsl.s, newHsl.l)
    
    r = newRgb2.r
    g = newRgb2.g
    b = newRgb2.b
    
    // Apply temperature
    if (settings.temperature !== 0) {
      const temp = settings.temperature / 100
      if (temp > 0) {
        // Warm: increase red, decrease blue
        r = Math.max(0, Math.min(255, r + temp * 20))
        b = Math.max(0, Math.min(255, b - temp * 10))
      } else {
        // Cool: increase blue, decrease red
        r = Math.max(0, Math.min(255, r + temp * 10))
        b = Math.max(0, Math.min(255, b - temp * 20))
      }
    }
    
    newData[i] = r
    newData[i + 1] = g
    newData[i + 2] = b
    newData[i + 3] = data[i + 3] // Alpha channel
  }
  
  return new ImageData(newData, imageData.width, imageData.height)
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100
  
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h * 6) % 2 - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0
  
  if (h < 1 / 6) {
    r = c
    g = x
    b = 0
  } else if (h < 2 / 6) {
    r = x
    g = c
    b = 0
  } else if (h < 3 / 6) {
    r = 0
    g = c
    b = x
  } else if (h < 4 / 6) {
    r = 0
    g = x
    b = c
  } else if (h < 5 / 6) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
} 