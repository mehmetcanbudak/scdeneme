"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import OTPLoginForm from './otp-login-form'
import { useAuth } from '@/contexts/auth-context'
import { User, LogOut, Settings, ShoppingBag, CreditCard } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { user, logout, isAuthenticated } = useAuth()

  const handleLoginSuccess = () => {
    onClose()
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  if (isAuthenticated && user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {user.firstName || 'Kullanıcı'}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">{user.phone}</p>
              {user.email && (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-12 text-left bg-secondary/50 hover:bg-secondary/80 border border-border/30 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-md text-foreground hover:text-foreground"
                onClick={() => {
                  onClose()
                  // Navigate to profile page
                  window.location.href = '/profile'
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Profil Ayarları</span>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-12 text-left bg-secondary/50 hover:bg-secondary/80 border border-border/30 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-md text-foreground hover:text-foreground"
                onClick={() => {
                  onClose()
                  // Navigate to orders page
                  window.location.href = '/orders'
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">Siparişlerim</span>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-12 text-left bg-secondary/50 hover:bg-secondary/80 border border-border/30 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-md text-foreground hover:text-foreground"
                onClick={() => {
                  onClose()
                  // Navigate to subscriptions page
                  window.location.href = '/subscriptions'
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium">Aboneliklerim</span>
              </Button>
            </div>
            
            {/* Logout Button */}
            <div className="pt-4 border-t border-border/50">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10 border border-destructive/20 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                onClick={handleLogout}
              >
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="font-medium">Çıkış Yap</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <OTPLoginForm onSuccess={handleLoginSuccess} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}
