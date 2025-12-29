"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Key, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

interface ApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (apiKey: string) => void
}

export function ApiKeyDialog({ open, onOpenChange, onSave }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const validateApiKey = (key: string) => {
    // Basic validation: OpenAI keys start with 'sk-' and have a specific length
    return key.startsWith('sk-') && key.length > 20
  }

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your OpenAI API key')
      return
    }

    if (!validateApiKey(apiKey)) {
      toast.error('Invalid API key format. OpenAI keys start with "sk-"')
      return
    }

    setIsValidating(true)
    
    // Optionally validate the key by making a test API call
    try {
      // Store in localStorage
      localStorage.setItem('user_openai_api_key', apiKey)
      toast.success('API key saved successfully!')
      onSave(apiKey)
      onOpenChange(false)
    } catch {
      toast.error('Failed to save API key')
    } finally {
      setIsValidating(false)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('user_openai_api_key_skipped', 'true')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-purple-500" />
            <span>OpenAI API Key Required</span>
          </DialogTitle>
          <DialogDescription>
            To use AI-powered features like color analysis and insights, please provide your OpenAI API key.
            Your key is stored locally and never shared.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an API key? 
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-400 ml-1 inline-flex items-center"
              >
                Get one from OpenAI
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="text-sm font-medium">Why do I need this?</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Get AI-powered color grading suggestions</li>
              <li>• Analyze mood and style of your content</li>
              <li>• Receive intelligent insights for viral content</li>
              <li>• Your key is stored securely in your browser</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between space-x-2">
          <Button variant="outline" onClick={handleSkip}>
            Skip for now
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isValidating}
            className="bg-gradient-to-r from-purple-600 to-cyan-500"
          >
            {isValidating ? 'Saving...' : 'Save API Key'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
