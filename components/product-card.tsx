'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import type { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Check, ShoppingCart, Sparkles, MessageSquare, Bot, Zap } from 'lucide-react'

const categoryIcons = {
  whatsapp: MessageSquare,
  telegram: Bot,
  automation: Zap,
  ai: Sparkles,
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

  const Icon = categoryIcons[product.category]

  const handlePurchase = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    setIsLoading(true)
    // Simulate payment process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    addPurchase(product.id)
    setIsPurchased(true)
    setIsLoading(false)
    onPurchase?.(product.id)
  }

  return (
    <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
      {/* Product Image/Icon Area */}
      <CardHeader className="p-0">
        <div className="relative h-40 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,50,50,0.1),transparent_70%)]" />
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-card/80 border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-10 h-10 text-primary" />
            </div>
          </div>
          {product.popular && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Popular
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name[language]}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description[language]}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-4">
          {product.features[language].slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="w-3 h-3 text-primary flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <span className="text-sm text-muted-foreground">USD</span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        {isPurchased ? (
          <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
            <Check className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Acheté' : 'Purchased'}
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
          <Button variant="outline" className="border-border hover:border-primary">
            {t.products.details}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
