'use client'

import { useState, useEffect } from 'react'
import { X, Zap, Clock } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export function PromoBanner() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    // Show banner after 2 seconds
    const showTimer = setTimeout(() => setIsVisible(true), 2000)
    
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="hidden sm:flex items-center gap-2 bg-primary-foreground/10 rounded-full px-3 py-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'fr' ? 'Offre Flash' : 'Flash Sale'}
            </span>
          </div>
          
          <p className="text-sm font-medium flex-1 text-center sm:text-left">
            {language === 'fr' 
              ? '-30% sur tous les Bots WhatsApp avec le code: VARNOX30' 
              : '-30% on all WhatsApp Bots with code: VARNOX30'}
          </p>

          <div className="hidden md:flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-3 py-1">
            <Clock className="w-4 h-4" />
            <div className="flex items-center gap-1 font-mono text-sm font-bold">
              <span className="bg-primary-foreground/20 rounded px-1">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-primary-foreground/20 rounded px-1">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-primary-foreground/20 rounded px-1">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          <Link 
            href="/products?category=whatsapp"
            className="hidden sm:block text-xs font-semibold bg-primary-foreground text-primary rounded-full px-4 py-1.5 hover:bg-primary-foreground/90 transition-colors"
          >
            {language === 'fr' ? 'Voir' : 'Shop'}
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex-shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
