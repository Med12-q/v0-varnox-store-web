'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import { getProductById } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  User,
  Package,
  Download,
  ShoppingBag,
  Clock,
  CheckCircle,
  ExternalLink,
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { language, t } = useLanguage()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const purchasedProducts = user.purchases
    .map((id) => getProductById(id))
    .filter(Boolean)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.dashboard.title}</h1>
          <p className="text-muted-foreground">
            {t.dashboard.welcome}, <span className="text-primary">{user.name}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{purchasedProducts.length}</p>
                <p className="text-sm text-muted-foreground">{t.dashboard.myPurchases}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{purchasedProducts.length}</p>
                <p className="text-sm text-muted-foreground">{t.dashboard.myScripts}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{purchasedProducts.length}</p>
                <p className="text-sm text-muted-foreground">{t.dashboard.completed}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchases */}
        <Card className="glass border-border/50">
          <CardHeader>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              {t.dashboard.myPurchases}
            </h2>
          </CardHeader>
          <CardContent>
            {purchasedProducts.length > 0 ? (
              <div className="space-y-4">
                {purchasedProducts.map((product) => {
                  if (!product) return null
                  return (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-secondary/50 border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{product.name[language]}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date().toLocaleDateString(
                                language === 'fr' ? 'fr-FR' : 'en-US'
                              )}
                            </span>
                            <span className="flex items-center gap-1 text-green-500">
                              <CheckCircle className="w-3 h-3" />
                              {t.dashboard.completed}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {t.dashboard.download}
                        </Button>
                        <Link href={`/products/${product.id}`}>
                          <Button size="sm" variant="outline" className="border-border">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t.dashboard.noPurchases}</h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'fr'
                    ? 'Découvrez nos produits et commencez à automatiser !'
                    : 'Discover our products and start automating!'}
                </p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t.products.title}
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Info */}
        <Card className="glass border-border/50 mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              {language === 'fr' ? 'Mon Profil' : 'My Profile'}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">
                  {t.auth.name}
                </p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">
                  {t.auth.email}
                </p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
