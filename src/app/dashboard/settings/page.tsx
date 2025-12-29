"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Key,
  Palette,
  Download,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { useStatsStore } from '@/lib/stats-store'
import { useSettingsStore } from '@/lib/settings-store'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const { user, isConfigured } = useAuth()
  const { 
    totalUploads, 
    totalAIInsights, 
    storageUsed,
    resetMonthlyStats 
  } = useStatsStore()

  const {
    openaiApiKey,
    emailNotifications,
    weeklyInsights,
    autoSave,
    enableAdvancedControls,
    setOpenAIApiKey,
    clearOpenAIApiKey,
    updatePreference
  } = useSettingsStore()

  const getUserEmail = () => {
    if (!user) return 'demo@frameswithin.com'
    return user.email || 'user@example.com'
  }

  const getUserName = () => {
    if (!user) return 'Demo User'
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  }

  const handleSaveApiKey = () => {
    if (!apiKeyInput.trim()) {
      toast.error('Please enter a valid API key')
      return
    }
    if (!apiKeyInput.startsWith('sk-')) {
      toast.error('Invalid API key format. OpenAI keys start with "sk-"')
      return
    }
    setOpenAIApiKey(apiKeyInput)
    setApiKeyInput('')
    toast.success('API key saved successfully')
  }

  const handleRemoveApiKey = () => {
    clearOpenAIApiKey()
    setApiKeyInput('')
    toast.success('API key removed')
  }

  const handleResetStats = () => {
    resetMonthlyStats()
    toast.success('Monthly statistics have been reset')
  }

  const handleExportData = () => {
    const data = {
      user: {
        email: getUserEmail(),
        name: getUserName(),
      },
      stats: {
        totalUploads,
        totalAIInsights,
        storageUsed,
      },
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'frameswithin-data-export.json'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Data exported successfully')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Account</span>
            </CardTitle>
            <CardDescription>
              Manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <input
                id="email"
                type="email"
                defaultValue={getUserEmail()}
                disabled={!isConfigured}
                className="w-full px-3 py-2 border border-border rounded-md bg-background disabled:opacity-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <input
                id="name"
                type="text"
                defaultValue={getUserName()}
                disabled={!isConfigured}
                className="w-full px-3 py-2 border border-border rounded-md bg-background disabled:opacity-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                defaultValue="UTC+5:30"
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="UTC+5:30">UTC+5:30 (IST)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
                <option value="UTC-5">UTC-5 (EST)</option>
                <option value="UTC-8">UTC-8 (PST)</option>
              </select>
            </div>
            
            <Button className="w-full" disabled={!isConfigured}>
              {isConfigured ? 'Save Changes' : 'Demo Mode - Sign in to edit'}
            </Button>
          </CardContent>
        </Card>

        {/* API Key Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-purple-500" />
              <span>OpenAI API Key</span>
            </CardTitle>
            <CardDescription>
              Manage your API key for AI-powered features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {openaiApiKey ? (
              <>
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">API Key Connected</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
                
                <div className="space-y-2">
                  <Label>Your API Key</Label>
                  <div className="relative">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value={openaiApiKey}
                      disabled
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleRemoveApiKey}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove API Key
                </Button>
              </>
            ) : (
              <>
                <div className="p-4 rounded-lg border border-dashed border-muted-foreground/50 text-center space-y-2">
                  <Key className="w-8 h-8 mx-auto text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No API key configured. AI features are disabled.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key-input">Enter OpenAI API Key</Label>
                  <Input
                    id="api-key-input"
                    type="password"
                    placeholder="sk-..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{' '}
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:text-purple-400 inline-flex items-center"
                    >
                      OpenAI Platform
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500"
                  onClick={handleSaveApiKey}
                  disabled={!apiKeyInput}
                >
                  Save API Key
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-orange-500" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>
            Configure your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your account
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={(checked) => updatePreference('emailNotifications', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-insights">Weekly AI Insights</Label>
              <p className="text-sm text-muted-foreground">
                Get weekly email with AI-powered suggestions
              </p>
            </div>
            <Switch
              id="weekly-insights"
              checked={weeklyInsights}
              onCheckedChange={(checked) => updatePreference('weeklyInsights', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save">Auto Save</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save your work in progress
              </p>
            </div>
            <Switch
              id="auto-save"
              checked={autoSave}
              onCheckedChange={(checked) => updatePreference('autoSave', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="advanced-controls">Advanced Editing Controls</Label>
              <p className="text-sm text-muted-foreground">
                Show advanced color grading tools
              </p>
            </div>
            <Switch
              id="advanced-controls"
              checked={enableAdvancedControls}
              onCheckedChange={(checked) => updatePreference('enableAdvancedControls', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-purple-500" />
            <span>Preferences</span>
          </CardTitle>
          <CardDescription>
            Customize your FramesWithin experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-format">Default Export Format</Label>
            <select
              id="default-format"
              defaultValue="png"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="json">JSON</option>
              <option value="lut">LUT (Pro)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quality">Export Quality</Label>
            <select
              id="quality"
              defaultValue="high"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="low">Low (Fast)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Best)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <select
              id="theme"
              defaultValue="dark"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-500" />
            <span>Advanced Settings</span>
          </CardTitle>
          <CardDescription>
            Advanced configuration options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-start"
          >
            {showAdvanced ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
          </Button>
          
          {showAdvanced && (
            <div className="mt-4 space-y-4">
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL</Label>
                <input
                  id="webhook"
                  type="url"
                  placeholder="https://your-webhook-url.com"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logging for troubleshooting
                  </p>
                </div>
                <Switch id="debug-mode" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <Shield className="w-5 h-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-red-200 dark:border-red-800">
            <div>
              <p className="font-medium">Reset Statistics</p>
              <p className="text-sm text-muted-foreground">
                Reset your monthly statistics to zero
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleResetStats}>
              <Trash2 className="w-4 h-4 mr-2" />
              Reset Stats
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground">
                Download all your data as JSON
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 