'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, Sparkles, Zap, Shield, MessageSquare } from 'lucide-react'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,50,50,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(50,150,255,0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Premium Automation Tools</span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-150" />
              <div className="relative w-24 h-24 rounded-2xl bg-card border border-primary/50 flex items-center justify-center neon-border">
                <span className="text-5xl font-bold text-primary text-glow">V</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-primary text-glow">{t.hero.title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-4">{t.hero.subtitle}</p>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 group">
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/assistant">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 px-8"
              >
                <Bot className="w-4 h-4 mr-2" />
                {t.hero.secondary}
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: MessageSquare, label: 'WhatsApp Bots', color: 'text-green-400' },
              { icon: Bot, label: 'Telegram Bots', color: 'text-blue-400' },
              { icon: Zap, label: 'Automation', color: 'text-yellow-400' },
              { icon: Shield, label: 'Secure & Fast', color: 'text-primary' },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <feature.icon className={`w-6 h-6 ${feature.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                <p className="text-sm text-muted-foreground">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
