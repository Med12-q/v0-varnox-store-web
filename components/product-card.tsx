'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import type { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Check, ShoppingCart, Sparkles, MessageSquare, Bot, Zap, Shield, Wrench, Brain } from 'lucide-react'

const categoryIcons = {
  whatsapp: MessageSquare,
  telegram: Bot,
  automation: Zap,
  ai: Brain,
  security: Shield,
  tools: Wrench,
}

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-primary/90 text-primary-foreground',
  'Premium': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  'Hot': 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
  'Pro': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
  'Popular': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  'Security': 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
  'AI Powered': 'bg-gradient-to-r from-violet-500 to-purple-500 text-white',
}

type ProductCardProps = {
  product: Product
  onPurchase?: (productId: string) => void
}

export function ProductCard({ product, onPurchase }: ProductCardProps) {
  const { language, t } = useLanguage()
  const { user, addPurchase } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchased, setIsPurchased] = useState(user?.purchases.includes(product.id) || false)
  const [imageError, setImageError] = useState(false)

  const Icon = categoryIcons[product.category]

  const handlePurchase = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    addPurchase(product.id)
    setIsPurchased(true)
    setIsLoading(false)
    onPurchase?.(product.id)
  }

  return (
    <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-44 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 overflow-hidden">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name[language]}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-card/80 border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-10 h-10 text-primary" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Badge */}
          {product.badge && (
            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg ${badgeColors[product.badge] || 'bg-primary/90 text-primary-foreground'}`}>
              {product.popular && <Sparkles className="w-3 h-3" />}
              {product.badge}
            </div>
          )}
          
          {/* Category Icon */}
          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {product.name[language]}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description[language]}
        </p>

        <ul className="space-y-1.5 mb-4">
          {product.features[language].slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <span className="text-sm text-muted-foreground">USD</span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        {isPurchased ? (
          <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
            <Check className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Achete' : 'Purchased'}
          </Button>
        ) : (
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handlePurchase}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {t.common.loading}
              </span>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t.products.buyNow}
              </>
            )}
          </Button>
        )}
        <Link href={`/products/${product.id}`}>
          <Button variant="outline" className="border-border hover:border-primary hover:bg-primary/10">
            {t.products.details}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
