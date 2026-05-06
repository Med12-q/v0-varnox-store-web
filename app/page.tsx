'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { products } from '@/lib/products'
import { HeroSection } from '@/components/hero-section'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, Shield, Zap, Clock, Headphones, RefreshCw } from 'lucide-react'

export default function HomePage() {
  const { t } = useLanguage()
  const popularProducts = products.filter((p) => p.popular).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Products Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.products.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.products.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 group">
                {t.products.title}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.language === 'fr' ? 'Pourquoi VARNOX STORE ?' : 'Why VARNOX STORE?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: { fr: 'Sécurisé', en: 'Secure' },
                description: {
                  fr: 'Tous nos scripts sont testés et sécurisés pour votre tranquillité d\'esprit.',
                  en: 'All our scripts are tested and secured for your peace of mind.',
                },
              },
              {
                icon: Zap,
                title: { fr: 'Rapide', en: 'Fast' },
                description: {
                  fr: 'Performance optimisée pour une exécution ultra-rapide.',
                  en: 'Optimized performance for ultra-fast execution.',
                },
              },
              {
                icon: Headphones,
                title: { fr: 'Support 24/7', en: '24/7 Support' },
                description: {
                  fr: 'Notre équipe est disponible 24h/24 pour vous assister.',
                  en: 'Our team is available 24/7 to assist you.',
                },
              },
              {
                icon: RefreshCw,
                title: { fr: 'Mises à jour', en: 'Updates' },
                description: {
                  fr: 'Mises à jour régulières et gratuites pour tous nos produits.',
                  en: 'Regular and free updates for all our products.',
                },
              },
              {
                icon: Clock,
                title: { fr: 'Livraison Instantanée', en: 'Instant Delivery' },
                description: {
                  fr: 'Accès immédiat après achat, sans délai d\'attente.',
                  en: 'Immediate access after purchase, no waiting time.',
                },
              },
              {
                icon: Bot,
                title: { fr: 'Assistant IA', en: 'AI Assistant' },
                description: {
                  fr: 'Un assistant intelligent pour répondre à toutes vos questions.',
                  en: 'An intelligent assistant to answer all your questions.',
                },
              },
            ].map((feature, index) => {
              const { language } = useLanguage()
              return (
                <div
                  key={index}
                  className="glass rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title[language]}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description[language]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6 neon-border-blue">
              <Bot className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.assistant.title}</h2>
            <p className="text-muted-foreground mb-8">{t.assistant.subtitle}</p>
            <Link href="/assistant">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Bot className="w-4 h-4 mr-2" />
                {t.hero.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
