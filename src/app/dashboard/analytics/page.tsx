"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  Upload, 
  Palette, 
  Sparkles,
  Download,
  BarChart3,
  Activity,
  Zap,
  RefreshCw
} from 'lucide-react'
import { useStatsStore } from '@/lib/stats-store'
import { 
  TrendAreaChart, 
  ComparisonLineChart, 
  StatsBarChart, 
  DistributionPieChart,
  RadialProgress,
  Sparkline,
  COLORS
} from '@/components/charts'

export default function AnalyticsPage() {
  const {
    totalUploads,
    totalPalettes,
    totalAIInsights,
    totalExports,
    aiInsightsLimit,
    storageLimit,
    uploadsLimit,
    storageUsed,
    monthlyData,
    resetMonthlyStats
  } = useStatsStore()

  // Calculate derived stats
  const aiInsightsRemaining = Math.max(0, aiInsightsLimit - totalAIInsights)
  const storagePercentage = (storageUsed / storageLimit) * 100
  const uploadsPercentage = (totalUploads / uploadsLimit) * 100

  // Prepare chart data
  const trendDataKeys = [
    { key: 'uploads', color: COLORS.blue, name: 'Uploads' },
    { key: 'palettes', color: COLORS.purple, name: 'Palettes' },
    { key: 'insights', color: COLORS.pink, name: 'AI Insights' },
    { key: 'exports', color: COLORS.green, name: 'Exports' },
  ]

  const distributionData = [
    { name: 'Uploads', value: totalUploads, color: COLORS.blue },
    { name: 'Palettes', value: totalPalettes, color: COLORS.purple },
    { name: 'AI Insights', value: totalAIInsights, color: COLORS.pink },
    { name: 'Exports', value: totalExports, color: COLORS.green },
  ]

  const barChartData = monthlyData.map(m => ({
    name: m.month,
    value: m.uploads + m.palettes + m.insights + m.exports,
  }))

  // Generate sparkline data from monthly data
  const uploadSparkline = monthlyData.map(m => m.uploads)
  const paletteSparkline = monthlyData.map(m => m.palettes)
  const insightSparkline = monthlyData.map(m => m.insights)
  const exportSparkline = monthlyData.map(m => m.exports)

  const stats = [
    {
      title: "Total Uploads",
      value: totalUploads,
      change: totalUploads > 0 ? `${totalUploads} this period` : 'No uploads yet',
      changeType: totalUploads > 0 ? "positive" : "neutral",
      icon: Upload,
      color: COLORS.blue,
      sparkline: uploadSparkline
    },
    {
      title: "Palettes Extracted",
      value: totalPalettes,
      change: totalPalettes > 0 ? `${totalPalettes} extracted` : 'Upload to extract',
      changeType: totalPalettes > 0 ? "positive" : "neutral",
      icon: Palette,
      color: COLORS.purple,
      sparkline: paletteSparkline
    },
    {
      title: "AI Insights Used",
      value: totalAIInsights,
      change: `${aiInsightsRemaining} remaining`,
      changeType: aiInsightsRemaining > 5 ? "positive" : aiInsightsRemaining > 0 ? "neutral" : "negative",
      icon: Sparkles,
      color: COLORS.pink,
      sparkline: insightSparkline
    },
    {
      title: "Exports Generated",
      value: totalExports,
      change: totalExports > 0 ? `${totalExports} files` : 'No exports yet',
      changeType: totalExports > 0 ? "positive" : "neutral",
      icon: Download,
      color: COLORS.green,
      sparkline: exportSparkline
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your usage and performance metrics in real-time
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetMonthlyStats}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset Stats
        </Button>
      </div>

      {/* Stats Overview with Sparklines */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${
                    stat.changeType === 'positive' ? 'text-green-500' : 
                    stat.changeType === 'negative' ? 'text-red-500' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <Sparkline data={stat.sparkline} color={stat.color} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="distribution">
            <BarChart3 className="w-4 h-4 mr-2" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="usage">
            <Activity className="w-4 h-4 mr-2" />
            Usage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Activity Trends</span>
                </CardTitle>
                <CardDescription>
                  Your activity over the past months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrendAreaChart 
                  data={monthlyData}
                  dataKeys={trendDataKeys}
                  xAxisKey="month"
                  height={280}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>Feature Comparison</span>
                </CardTitle>
                <CardDescription>
                  Compare different feature usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComparisonLineChart 
                  data={monthlyData}
                  dataKeys={trendDataKeys}
                  xAxisKey="month"
                  height={280}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  <span>Monthly Activity</span>
                </CardTitle>
                <CardDescription>
                  Total activity by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StatsBarChart 
                  data={barChartData}
                  height={280}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Feature Distribution</span>
                </CardTitle>
                <CardDescription>
                  How you use FramesWithin features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DistributionPieChart 
                  data={distributionData}
                  height={280}
                  innerRadius={50}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <RadialProgress 
                  value={totalAIInsights}
                  max={aiInsightsLimit}
                  label="Used"
                  color={COLORS.pink}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Storage</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <RadialProgress 
                  value={Math.round(storageUsed * 10) / 10}
                  max={storageLimit}
                  label="GB Used"
                  color={COLORS.blue}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Uploads</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <RadialProgress 
                  value={totalUploads}
                  max={uploadsLimit}
                  label="Files"
                  color={COLORS.purple}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Plan Usage Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Usage Summary</CardTitle>
          <CardDescription>
            Track your current plan limits and usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-medium">AI Insights</span>
                </div>
                <span className="text-sm text-muted-foreground">{totalAIInsights} / {aiInsightsLimit}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((totalAIInsights / aiInsightsLimit) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <span className="text-sm text-muted-foreground">{storageUsed.toFixed(1)} GB / {storageLimit} GB</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${storagePercentage}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Uploads</span>
                </div>
                <span className="text-sm text-muted-foreground">{totalUploads} / {uploadsLimit}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${uploadsPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Current Plan</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Upgrade to Pro for unlimited AI insights and 50GB storage
                </p>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 text-purple-400">
                Basic Plan
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
