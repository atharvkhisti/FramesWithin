"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Palette, 
  Upload, 
  Settings, 
  BarChart3, 
  Sparkles,
  Home,
  User
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Upload & Grade', href: '/dashboard/upload', icon: Upload },
  { name: 'Color Palette', href: '/dashboard/palette', icon: Palette },
  { name: 'AI Insights', href: '/dashboard/insights', icon: Sparkles },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-card border-r border-border">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">FramesWithin</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary text-secondary-foreground"
                )}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <Link href="/dashboard/profile">
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-3" />
            Profile
          </Button>
        </Link>
      </div>
    </div>
  )
} 