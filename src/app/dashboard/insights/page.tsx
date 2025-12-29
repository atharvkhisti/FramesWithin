"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, 
  TrendingUp, 
  Hash, 
  MessageSquare,
  Copy,
  Check,
  Loader2,
  Key
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useStatsStore } from '@/lib/stats-store'
import { useSettingsStore } from '@/lib/settings-store'
import { toast } from 'sonner'
import Link from 'next/link'

export default function InsightsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const aiInsights = useAppStore((s) => s.aiInsights)
  const setAIInsights = useAppStore((s) => s.setAIInsights)
  const palette = useAppStore((s) => s.palette)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  
  const { incrementAIInsights, totalAIInsights } = useStatsStore()
  const { openaiApiKey } = useSettingsStore()

  const handleAnalyze = async () => {
    if (!openaiApiKey) {
      toast.error('Please add your OpenAI API key in Settings to use AI features')
      return
    }
    
    setIsAnalyzing(true)
    
    try {
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          palette,
          imageDescription: null,
          apiKey: openaiApiKey
        })
      })
      
      const data = await response.json()
      
      if (data.insights) {
        setAIInsights(data.insights)
        incrementAIInsights() // Track AI insight usage
        if (data.mock) {
          toast.info('Using demo insights. Check your API key for personalized analysis.')
        } else {
          toast.success('AI analysis complete!')
        }
      } else {
        toast.error(data.error || 'Failed to generate insights')
      }
    } catch {
      toast.error('Failed to connect to AI service')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedText(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Insights</h1>
          <p className="text-muted-foreground">
            Get AI-powered suggestions to optimize your content for maximum engagement
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {totalAIInsights} insights generated
          </Badge>
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !openaiApiKey}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Insights
              </>
            )}
          </Button>
        </div>
      </div>

      {!openaiApiKey && (
        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-medium text-amber-500">OpenAI API Key Required</p>
                <p className="text-sm text-muted-foreground">
                  Add your API key to enable AI-powered insights
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="border-amber-500 text-amber-500">
              <Link href="/dashboard/settings">
                Add API Key
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {!aiInsights ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>AI Content Analysis</span>
            </CardTitle>
            <CardDescription>
              Upload your content to receive AI-powered suggestions for captions, hashtags, and optimization tips.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Ready for AI Analysis?</h3>
              <p className="text-muted-foreground mb-6">
                Get personalized suggestions to make your content go viral
              </p>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="mood" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mood">Visual Mood</TabsTrigger>
            <TabsTrigger value="suggestions">Grading Tips</TabsTrigger>
            <TabsTrigger value="captions">Captions</TabsTrigger>
            <TabsTrigger value="viral">Viral Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>Visual Mood Analysis</span>
                </CardTitle>
                <CardDescription>
                  AI&apos;s interpretation of your content&apos;s visual style and mood
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{aiInsights.visualMood}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Color Grading Suggestions</span>
                </CardTitle>
                <CardDescription>
                  AI-recommended adjustments to enhance your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="captions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <span>Captions</span>
                  </CardTitle>
                  <CardDescription>
                    Engaging captions to boost your content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiInsights.captions.map((caption, index) => (
                      <div key={index} className="p-3 rounded-lg border">
                        <p className="text-sm mb-2">{caption}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(caption)}
                        >
                          {copiedText === caption ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hash className="w-5 h-5 text-pink-500" />
                    <span>Hashtags</span>
                  </CardTitle>
                  <CardDescription>
                    Trending hashtags to increase discoverability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {aiInsights.hashtags.map((hashtag, index) => (
                      <Badge key={index} variant="secondary">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(aiInsights.hashtags.join(' '))}
                  >
                    {copiedText === aiInsights.hashtags.join(' ') ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy All Hashtags
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="viral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span>Viral Boost Tips</span>
                </CardTitle>
                <CardDescription>
                  Strategies to maximize your content&apos;s reach and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.viralTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border">
                      <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Tip {index + 1}</p>
                        <p className="text-sm text-muted-foreground">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Usage</CardTitle>
          <CardDescription>
            Track your AI insights usage for this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Insights Used</span>
              <span className="text-sm text-muted-foreground">1 / 5</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-600 to-cyan-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground">
              4 AI insights remaining this month. Upgrade to Pro for unlimited analysis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 