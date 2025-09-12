"use client"

import { useEffect } from 'react'
import { useNavigation } from '@/components/navigation-context'

export function useNavigationTransparency(transparent: boolean = false) {
  const { setIsTransparent } = useNavigation()

  useEffect(() => {
    setIsTransparent(transparent)
    
    // Cleanup: reset to non-transparent when component unmounts
    return () => setIsTransparent(false)
  }, [transparent, setIsTransparent])
}
