import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Palette, 
  Camera, 
  Sparkles, 
  Download, 
  Zap, 
  CheckCircle,
  TrendingUp
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-animate opacity-10"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Color Grading
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Craft Viral Videos with
              <br />
              <span className="text-foreground">AI-Powered Color Grading</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Extract color palettes, detect fonts, and get AI-powered suggestions to create 
              stunning content that goes viral. Perfect for creators and video editors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
                <Link href="/dashboard">
                  Get Started Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">
                  See Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Create Viral Content</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From color palette extraction to AI-powered optimization, FramesWithin has everything 
              you need to make your content stand out.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle>Color Palette Extraction</CardTitle>
                <CardDescription>
                  Automatically extract dominant colors, RGB values, and color temperature from your images and videos.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-cyan-500" />
                </div>
                <CardTitle>Real-Time Color Grading</CardTitle>
                <CardDescription>
                  Professional-grade color grading tools with brightness, contrast, saturation, and temperature controls.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                </div>
                <CardTitle>AI Content Optimization</CardTitle>
                <CardDescription>
                  Get AI-powered suggestions for captions, hashtags, and visual improvements to boost engagement.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-orange-500" />
                </div>
                <CardTitle>Export & Share</CardTitle>
                <CardDescription>
                  Export your graded content as PNG, JSON configs, or LUT files for professional workflows.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle>Font Detection</CardTitle>
                <CardDescription>
                  Automatically detect fonts from your content using advanced OCR technology.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Viral Boost Tips</CardTitle>
                <CardDescription>
                  Receive personalized suggestions to improve your content&apos;s viral potential and engagement.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              Start free and upgrade as you grow. No hidden fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <Card className="border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Creator Basic</CardTitle>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold">₹149</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>
                  Perfect for creators getting started with color grading
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Upload images & videos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Color palette extraction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Basic color grading (5 sliders)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>AI feedback (5 uses/month)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Export PNG & JSON</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-2 border-purple-500/50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500 text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Creator Pro</CardTitle>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold">₹499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>
                  Advanced features for professional creators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Everything in Basic</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>HSL editing & tone curves</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>LUT support & presets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited AI analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Export LUT files</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Weekly email suggestions</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600" asChild>
                  <Link href="/dashboard">Start Pro Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Create Viral Content?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using FramesWithin to make their content stand out.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600" asChild>
            <Link href="/dashboard">
              Start Creating Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
