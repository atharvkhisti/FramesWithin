import { create } from 'zustand'
import type { AIInsight } from '@/features/ai/insights'

export type GradingSettings = {
  brightness: number
  contrast: number
  saturation: number
  hue: number
  temperature: number
  // Advanced controls
  vibrance: number
  exposure: number
  shadows: number
  highlights: number
  clarity: number
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

export type Palette = {
  dominant: string[]
  rgb: Array<{ r: number; g: number; b: number }>
  hsl: Array<{ h: number; s: number; l: number }>
  temperature: 'warm' | 'cool' | 'neutral'
}

export type User = {
  id: string
  email: string
  subscription_tier: 'basic' | 'pro' | null
  subscription_status: 'active' | 'inactive' | null
}

interface GradingBreakdown {
  temperature: number;
  tint: number;
  hue: number;
  saturation: number;
  exposure: number;
  radiance: number;
  density: number;
  colorBalance: string;
  balanceCurve: string;
  chromaCurve: string;
}

interface AppState {
  grading: GradingSettings
  setGrading: (g: Partial<GradingSettings>) => void
  palette: Palette | null
  setPalette: (p: Palette | null) => void
  user: User | null
  setUser: (u: User | null) => void
  aiInsights: AIInsight | null
  setAIInsights: (i: AIInsight | null) => void
  gradingBreakdown: GradingBreakdown | null;
  setGradingBreakdown: (b: GradingBreakdown | null) => void;
  uploadedFile: File | null;
  setUploadedFile: (f: File | null) => void;
  uploadedUrl: string | null;
  setUploadedUrl: (url: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  grading: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    temperature: 0,
    vibrance: 0,
    exposure: 0,
    shadows: 0,
    highlights: 0,
    clarity: 0,
  },
  setGrading: (g) => set((state) => ({ grading: { ...state.grading, ...g } })),
  palette: null,
  setPalette: (p) => set({ palette: p }),
  user: null,
  setUser: (u) => set({ user: u }),
  aiInsights: null,
  setAIInsights: (i) => set({ aiInsights: i }),
  gradingBreakdown: null,
  setGradingBreakdown: (b) => set({ gradingBreakdown: b }),
  uploadedFile: null,
  setUploadedFile: (f) => set({ uploadedFile: f }),
  uploadedUrl: null,
  setUploadedUrl: (url) => set({ uploadedUrl: url }),
})) 