"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  Download, 
  RotateCcw, 
  Eye,
  EyeOff
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useStatsStore } from '@/lib/stats-store'
import { extractColorPaletteAsync, applyGradingSettings } from '@/features/grading'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Palette } from 'lucide-react'
import type { GradingSettings } from '@/lib/store'
import BreakdownPanel from '@/components/grading-tools/BreakdownPanel'
import ExportButton from '@/components/grading-tools/ExportButton'
import { AdvancedGradingControls } from '@/components/grading-tools/AdvancedGradingControls'

export default function UploadPage() {
  const uploadedFile = useAppStore((s) => s.uploadedFile)
  const setUploadedFile = useAppStore((s) => s.setUploadedFile)
  const uploadedUrl = useAppStore((s) => s.uploadedUrl)
  const setUploadedUrl = useAppStore((s) => s.setUploadedUrl)
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)
  const [showBreakdownPanel, setShowBreakdownPanel] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const gradingSettings = useAppStore((s) => s.grading)
  const setGrading = useAppStore((s) => s.setGrading)
  const palette = useAppStore((s) => s.palette)
  const setPalette = useAppStore((s) => s.setPalette)
  const setGradingBreakdown = useAppStore((s) => s.setGradingBreakdown)

  // Stats tracking
  const { incrementUploads, incrementPalettes, incrementExports, addUpload, addStorageUsed } = useStatsStore()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const url = URL.createObjectURL(file)
      setUploadedUrl(url)
      
      // Track upload in stats
      const fileType = file.type.startsWith('video/') ? 'video' : 'image'
      const fileSizeMB = file.size / 1024 / 1024
      
      addUpload({
        name: file.name,
        type: fileType,
        size: fileSizeMB,
        status: 'processing'
      })
      incrementUploads()
      addStorageUsed(fileSizeMB) // Track storage usage
    }
  }

  const processImage = async (url: string) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const palette = await extractColorPaletteAsync(img, 10);
        setPalette(palette);
        incrementPalettes(); // Track palette extraction
        // Call grading breakdown API
        fetch('/api/gpt-breakdown', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: url, palette })
        })
          .then(res => res.json())
          .then(data => setGradingBreakdown(data.breakdown))
          .catch(() => setGradingBreakdown(null));
      } catch {
        setPalette(null);
        setGradingBreakdown(null);
      }
      if (originalCanvasRef.current) {
        const originalCtx = originalCanvasRef.current.getContext('2d')!;
        originalCanvasRef.current.width = img.width;
        originalCanvasRef.current.height = img.height;
        originalCtx.drawImage(img, 0, 0);
      }
    };
    img.src = url;
  };

  // Extract palette from current video frame
  const extractPaletteFromVideoFrame = useCallback(async () => {
    const video = videoRef.current
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    try {
      const palette = await extractColorPaletteAsync(canvas, 10)
      setPalette(palette)
      incrementPalettes() // Track palette extraction
    } catch {
      setPalette(null)
    }
  }, [setPalette, incrementPalettes])

  // Attach event listeners to video for palette extraction
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleSeeked = () => {
      extractPaletteFromVideoFrame()
    }
    const handleLoadedData = () => {
      extractPaletteFromVideoFrame()
    }
    video.addEventListener('seeked', handleSeeked)
    video.addEventListener('loadeddata', handleLoadedData)
    return () => {
      video.removeEventListener('seeked', handleSeeked)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [uploadedFile, uploadedUrl, extractPaletteFromVideoFrame])

  const processVideo = async () => {
    // No-op: palette extraction is now handled by video event listeners
  }

  useEffect(() => {
    if (uploadedFile && uploadedUrl && originalCanvasRef.current && canvasRef.current) {
      if (uploadedFile.type.startsWith('image/')) {
        processImage(uploadedUrl);
      } else if (uploadedFile.type.startsWith('video/')) {
        processVideo();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFile, uploadedUrl, originalCanvasRef.current, canvasRef.current]);

  useEffect(() => {
    if (uploadedFile && uploadedUrl && originalCanvasRef.current && canvasRef.current) {
      applyGrading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradingSettings, uploadedFile, uploadedUrl, originalCanvasRef.current, canvasRef.current]);

  useEffect(() => {
    if (
      !showBeforeAfter &&
      uploadedUrl &&
      originalCanvasRef.current &&
      canvasRef.current
    ) {
      applyGrading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBeforeAfter]);

  const handleSliderChange = (value: number, setting: keyof GradingSettings) => {
    setGrading({ [setting]: value })
  }

  const resetGrading = () => {
    setGrading({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      hue: 0,
      temperature: 0
    })
  }

  const exportImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'graded-image.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
      incrementExports() // Track export
    }
  }

  const applyGrading = () => {
    console.log("applyGrading called");
    if (!originalCanvasRef.current || !canvasRef.current) {
      console.warn("Canvas refs not set", { original: originalCanvasRef.current, processed: canvasRef.current });
      return;
    }
    const originalCtx = originalCanvasRef.current.getContext('2d')!;
    const ctx = canvasRef.current.getContext('2d')!;
    const imageData = originalCtx.getImageData(0, 0, originalCanvasRef.current.width, originalCanvasRef.current.height);
    const processedImageData = applyGradingSettings(imageData, gradingSettings);
    canvasRef.current.width = processedImageData.width;
    canvasRef.current.height = processedImageData.height;
    ctx.putImageData(processedImageData, 0, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upload & Grade</h1>
          <p className="text-muted-foreground">
            Upload your content and apply professional color grading
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
            <CardDescription>
              Upload images or videos to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button asChild>
                <label htmlFor="file-upload">
                  Choose File
                </label>
              </Button>
            </div>
            {uploadedFile && (
              <div className="p-3 rounded-lg border">
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Canvas/Preview Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    Real-time color grading preview
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  >
                    {showBeforeAfter ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showBeforeAfter ? 'Hide' : 'Show'} Before/After
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetGrading}>
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={exportImage}>
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {uploadedUrl ? (
                <div className="relative">
                  {uploadedFile && uploadedFile.type.startsWith('video/') ? (
                    <video
                      ref={videoRef}
                      src={uploadedUrl}
                      controls
                      className="w-full h-auto border rounded-lg mb-4"
                      style={{ maxHeight: 320 }}
                    />
                  ) : null}
                  <div className={showBeforeAfter ? "grid grid-cols-2 gap-4" : ""}>
                    <div style={{ display: showBeforeAfter ? "block" : "none" }}>
                      <p className="text-sm font-medium mb-2">Original</p>
                      <canvas
                        ref={originalCanvasRef}
                        className="w-full h-auto border rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Graded</p>
                      <canvas
                        ref={canvasRef}
                        className="w-full h-auto border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Upload an image or video to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Grading Controls */}
      {uploadedUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Color Grading Controls</CardTitle>
            <CardDescription>
              Adjust the look and feel of your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdvancedGradingControls
              settings={gradingSettings}
              onChange={(key, value) => handleSliderChange(value, key as keyof GradingSettings)}
            />
          </CardContent>
        </Card>
      )}

      {/* Color Palette */}
      {palette && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Extracted Color Palette</span>
            </CardTitle>
            <CardDescription>
              Dominant colors from your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Temperature: {palette.temperature}</Badge>
                <Badge variant="outline">{palette.dominant.length} colors</Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {palette.dominant.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="w-full h-16 rounded-lg border"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-xs font-mono text-center">{color}</p>
                    <p className="text-xs text-muted-foreground text-center">
                      RGB({palette.rgb[index].r}, {palette.rgb[index].g}, {palette.rgb[index].b})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Grading Breakdown Panel & Export */}
      {/* Only render BreakdownPanel when showBreakdownPanel is true */}
      {showBreakdownPanel && (
        <div style={{ minHeight: 300 }}>
          <BreakdownPanel />
        </div>
      )}
      <ExportButton />
      {/* AI Breakdown Panel Button */}
      {uploadedUrl && (
        <div className="flex justify-end">
          <Button variant="secondary" onClick={() => setShowBreakdownPanel((v) => !v)}>
            <Sparkles className="w-4 h-4 mr-2" />
            {showBreakdownPanel ? 'Hide' : 'Show'} AI Breakdown
          </Button>
        </div>
      )}
    </div>
  )
} 