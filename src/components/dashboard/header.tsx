"use client"

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Bell, Settings, LogOut, User, CreditCard, Loader2, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import Link from 'next/link'

export function Header() {
  const { user, isLoading, isConfigured, signOut } = useAuth()

  const getUserInitials = () => {
    if (!user) return 'D'  // D for Demo
    const name = user.user_metadata?.full_name || user.email || ''
    if (name.includes('@')) {
      return name.charAt(0).toUpperCase()
    }
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getUserName = () => {
    if (!user) return 'Demo User'
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  }

  const getUserEmail = () => {
    if (!user) return 'demo@frameswithin.com'
    return user.email || 'user@example.com'
  }

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b border-border bg-card">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        {!isConfigured && (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Demo Mode
          </Badge>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={getUserName()} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getUserName()}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {getUserEmail()}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              {isConfigured && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
} 