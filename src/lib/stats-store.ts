import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UploadRecord {
  id: string
  name: string
  type: 'image' | 'video'
  size: number // in MB
  uploadedAt: string // ISO date string for serialization
  status: 'processing' | 'processed' | 'failed'
  palette?: string[]
  hasAIInsight?: boolean
  exported?: boolean
}

export interface StatsState {
  // Counters
  totalUploads: number
  totalPalettes: number
  totalAIInsights: number
  totalExports: number
  
  // Usage limits (based on plan)
  aiInsightsLimit: number
  storageLimit: number // in GB
  uploadsLimit: number
  
  // Current usage
  storageUsed: number // in GB
  
  // Upload history
  uploads: UploadRecord[]
  recentUploads: UploadRecord[]
  
  // Monthly data for charts
  monthlyData: Array<{
    month: string
    uploads: number
    palettes: number
    insights: number
    exports: number
  }>
  
  // Actions
  incrementUploads: () => void
  incrementPalettes: () => void
  incrementAIInsights: () => void
  incrementExports: () => void
  addUpload: (upload: Omit<UploadRecord, 'id' | 'uploadedAt'>) => void
  updateUploadStatus: (id: string, status: UploadRecord['status']) => void
  markUploadExported: (id: string) => void
  addStorageUsed: (sizeInMB: number) => void
  resetMonthlyStats: () => void
}

const getMonthName = (date: Date) => {
  return date.toLocaleString('default', { month: 'short' })
}

const generateId = () => Math.random().toString(36).substring(2, 15)

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      // Initial values
      totalUploads: 0,
      totalPalettes: 0,
      totalAIInsights: 0,
      totalExports: 0,
      
      aiInsightsLimit: 15,
      storageLimit: 5,
      uploadsLimit: 50,
      
      storageUsed: 0,
      
      uploads: [],
      
      monthlyData: [
        { month: 'Sep', uploads: 0, palettes: 0, insights: 0, exports: 0 },
        { month: 'Oct', uploads: 0, palettes: 0, insights: 0, exports: 0 },
        { month: 'Nov', uploads: 0, palettes: 0, insights: 0, exports: 0 },
        { month: 'Dec', uploads: 0, palettes: 0, insights: 0, exports: 0 },
      ],
      
      incrementUploads: () => set((state) => {
        const currentMonth = getMonthName(new Date())
        const monthlyData = state.monthlyData.map(m => 
          m.month === currentMonth ? { ...m, uploads: m.uploads + 1 } : m
        )
        return { 
          totalUploads: state.totalUploads + 1,
          monthlyData
        }
      }),
      
      incrementPalettes: () => set((state) => {
        const currentMonth = getMonthName(new Date())
        const monthlyData = state.monthlyData.map(m => 
          m.month === currentMonth ? { ...m, palettes: m.palettes + 1 } : m
        )
        return { 
          totalPalettes: state.totalPalettes + 1,
          monthlyData
        }
      }),
      
      incrementAIInsights: () => set((state) => {
        const currentMonth = getMonthName(new Date())
        const monthlyData = state.monthlyData.map(m => 
          m.month === currentMonth ? { ...m, insights: m.insights + 1 } : m
        )
        return { 
          totalAIInsights: state.totalAIInsights + 1,
          monthlyData
        }
      }),
      
      incrementExports: () => set((state) => {
        const currentMonth = getMonthName(new Date())
        const monthlyData = state.monthlyData.map(m => 
          m.month === currentMonth ? { ...m, exports: m.exports + 1 } : m
        )
        return { 
          totalExports: state.totalExports + 1,
          monthlyData
        }
      }),
      
      addUpload: (upload) => set((state) => ({
        uploads: [
          {
            ...upload,
            id: generateId(),
            uploadedAt: new Date().toISOString(),
          },
          ...state.uploads
        ].slice(0, 50) // Keep only last 50 uploads
      })),

      // Computed getter for recent uploads (for dashboard)
      get recentUploads() {
        return get().uploads.slice(0, 10)
      },
      
      updateUploadStatus: (id, status) => set((state) => ({
        uploads: state.uploads.map(u => 
          u.id === id ? { ...u, status } : u
        )
      })),
      
      markUploadExported: (id) => set((state) => ({
        uploads: state.uploads.map(u => 
          u.id === id ? { ...u, exported: true } : u
        )
      })),
      
      addStorageUsed: (sizeInMB) => set((state) => ({
        storageUsed: Math.min(state.storageUsed + (sizeInMB / 1024), state.storageLimit)
      })),
      
      resetMonthlyStats: () => set(() => ({
        monthlyData: [
          { month: 'Sep', uploads: 0, palettes: 0, insights: 0, exports: 0 },
          { month: 'Oct', uploads: 0, palettes: 0, insights: 0, exports: 0 },
          { month: 'Nov', uploads: 0, palettes: 0, insights: 0, exports: 0 },
          { month: 'Dec', uploads: 0, palettes: 0, insights: 0, exports: 0 },
        ]
      })),
    }),
    {
      name: 'frameswithin-stats',
    }
  )
)
