"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Palette, 
  Sparkles, 
  TrendingUp,
  Image,
  Video,
  Clock,
  Plus,
  Download
} from 'lucide-react'
import Link from 'next/link'
import { useStatsStore } from '@/lib/stats-store'
import { Sparkline, COLORS } from '@/components/charts'

export default function DashboardPage() {
  const {
    totalUploads,
    totalPalettes,
    totalAIInsights,
    totalExports,
    aiInsightsLimit,
    storageLimit,
    storageUsed,
    uploads,
    monthlyData
  } = useStatsStore()

  // Get recent uploads (last 3)
  const recentUploads = uploads?.slice(0, 3) || []

  const aiInsightsRemaining = Math.max(0, aiInsightsLimit - totalAIInsights)

  // Generate sparkline data
  const uploadSparkline = monthlyData.map(m => m.uploads)
  const paletteSparkline = monthlyData.map(m => m.palettes)
  const insightSparkline = monthlyData.map(m => m.insights)
  const exportSparkline = monthlyData.map(m => m.exports)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            Ready to create some viral content? Let&apos;s get started.
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
          <Link href="/dashboard/upload">
            <Plus className="w-4 h-4 mr-2" />
            New Upload
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <Upload className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{totalUploads}</div>
                <p className="text-xs text-muted-foreground">
                  {totalUploads > 0 ? `${totalUploads} files uploaded` : 'No uploads yet'}
                </p>
              </div>
              <Sparkline data={uploadSparkline} color={COLORS.blue} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Palettes Extracted</CardTitle>
            <Palette className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{totalPalettes}</div>
                <p className="text-xs text-muted-foreground">
                  {totalPalettes > 0 ? `${totalPalettes} color palettes` : 'Upload to extract'}
                </p>
              </div>
              <Sparkline data={paletteSparkline} color={COLORS.purple} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
            <Sparkles className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{totalAIInsights}</div>
                <p className={`text-xs ${aiInsightsRemaining <= 3 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {aiInsightsRemaining} remaining
                </p>
              </div>
              <Sparkline data={insightSparkline} color={COLORS.pink} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exports</CardTitle>
            <Download className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{totalExports}</div>
                <p className="text-xs text-muted-foreground">
                  {totalExports > 0 ? `${totalExports} files exported` : 'No exports yet'}
                </p>
              </div>
              <Sparkline data={exportSparkline} color={COLORS.green} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Uploads */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>
              Your latest content that&apos;s ready for grading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUploads.length > 0 ? (
              <>
                {recentUploads.slice(0, 3).map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      {upload.type === 'video' ? (
                        <Video className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Image className="w-5 h-5 text-green-500" />
                      )}
                      <div>
                        <p className="font-medium truncate max-w-[180px]">{upload.name}</p>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {new Date(upload.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={upload.status === 'processed' ? 'default' : 'secondary'}>
                      {upload.status}
                    </Badge>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No uploads yet</p>
                <p className="text-sm">Upload content to get started</p>
              </div>
            )}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/upload">
                {recentUploads.length > 0 ? 'View All Uploads' : 'Upload Now'}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Content
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/palette">
                <Palette className="w-4 h-4 mr-2" />
                Extract Color Palette
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/insights">
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Insights
              </Link>
            </Button>
            
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/analytics">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>
            Track your activity and storage usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-medium">AI Insights Generated</span>
                </div>
                <span className="text-sm text-muted-foreground">{totalAIInsights} insights</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(totalAIInsights * 5, 100)}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Storage Used</span>
                </div>
                <span className="text-sm text-muted-foreground">{storageUsed.toFixed(2)} GB / {storageLimit} GB</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(storageUsed / storageLimit) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Uploads</p>
                  <p className="text-lg font-semibold">{totalUploads}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Exports</p>
                  <p className="text-lg font-semibold">{totalExports}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 