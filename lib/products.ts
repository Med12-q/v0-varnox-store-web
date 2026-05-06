export type Product = {
  id: string
  name: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  price: number
  category: 'whatsapp' | 'telegram' | 'automation' | 'ai'
  features: {
    fr: string[]
    en: string[]
  }
  image: string
  popular?: boolean
}

export const products: Product[] = [
  {
    id: 'whatsapp-multi-device',
    name: {
      fr: 'WhatsApp Bot Multi-Device',
      en: 'WhatsApp Multi-Device Bot',
    },
    description: {
      fr: 'Bot WhatsApp professionnel compatible multi-appareils avec réponses automatiques, gestion de groupes et commandes personnalisées.',
      en: 'Professional WhatsApp bot compatible with multi-device, featuring auto-replies, group management, and custom commands.',
    },
    price: 49.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Compatible Multi-Device',
        'Réponses automatiques',
        'Gestion de groupes',
        'Commandes personnalisées',
        'Anti-spam intégré',
        'Support 24/7',
      ],
      en: [
        'Multi-Device Compatible',
        'Auto-replies',
        'Group management',
        'Custom commands',
        'Built-in anti-spam',
        '24/7 Support',
      ],
    },
    image: '/products/whatsapp-bot.png',
    popular: true,
  },
  {
    id: 'telegram-automation',
    name: {
      fr: 'Telegram Automation Bot',
      en: 'Telegram Automation Bot',
    },
    description: {
      fr: 'Bot Telegram complet pour automatiser vos canaux et groupes avec des fonctionnalités avancées de modération.',
      en: 'Complete Telegram bot to automate your channels and groups with advanced moderation features.',
    },
    price: 39.99,
    category: 'telegram',
    features: {
      fr: [
        'Modération automatique',
        'Gestion de canaux',
        'Commandes admin',
        'Statistiques en temps réel',
        'Filtres anti-spam',
        'Webhooks personnalisés',
      ],
      en: [
        'Auto-moderation',
        'Channel management',
        'Admin commands',
        'Real-time statistics',
        'Anti-spam filters',
        'Custom webhooks',
      ],
    },
    image: '/products/telegram-bot.png',
    popular: true,
  },
  {
    id: 'ai-chatbot-script',
    name: {
      fr: 'AI Chatbot Script',
      en: 'AI Chatbot Script',
    },
    description: {
      fr: 'Script de chatbot IA avancé utilisant les dernières technologies de traitement du langage naturel.',
      en: 'Advanced AI chatbot script using the latest natural language processing technologies.',
    },
    price: 79.99,
    category: 'ai',
    features: {
      fr: [
        'IA conversationnelle',
        'Apprentissage continu',
        'Multi-langues',
        'Intégration API facile',
        'Personnalisation complète',
        'Analyse de sentiments',
      ],
      en: [
        'Conversational AI',
        'Continuous learning',
        'Multi-language',
        'Easy API integration',
        'Full customization',
        'Sentiment analysis',
      ],
    },
    image: '/products/ai-chatbot.png',
    popular: true,
  },
  {
    id: 'social-media-automation',
    name: {
      fr: 'Social Media Automation',
      en: 'Social Media Automation',
    },
    description: {
      fr: 'Outil complet d\'automatisation pour gérer tous vos réseaux sociaux depuis une seule plateforme.',
      en: 'Complete automation tool to manage all your social networks from a single platform.',
    },
    price: 59.99,
    category: 'automation',
    features: {
      fr: [
        'Multi-plateformes',
        'Planification de posts',
        'Analytics intégrés',
        'Gestion de commentaires',
        'Auto-réponses',
        'Export de données',
      ],
      en: [
        'Multi-platform',
        'Post scheduling',
        'Built-in analytics',
        'Comment management',
        'Auto-replies',
        'Data export',
      ],
    },
    image: '/products/social-automation.png',
  },
  {
    id: 'whatsapp-crm',
    name: {
      fr: 'WhatsApp CRM Bot',
      en: 'WhatsApp CRM Bot',
    },
    description: {
      fr: 'Solution CRM complète intégrée à WhatsApp pour gérer vos clients et ventes.',
      en: 'Complete CRM solution integrated with WhatsApp to manage your customers and sales.',
    },
    price: 89.99,
    category: 'whatsapp',
    features: {
      fr: [
        'Gestion des contacts',
        'Suivi des conversations',
        'Automatisation des ventes',
        'Rapports détaillés',
        'Tags et segments',
        'Intégration paiement',
      ],
      en: [
        'Contact management',
        'Conversation tracking',
        'Sales automation',
        'Detailed reports',
        'Tags and segments',
        'Payment integration',
      ],
    },
    image: '/products/whatsapp-crm.png',
  },
  {
    id: 'telegram-shop-bot',
    name: {
      fr: 'Telegram Shop Bot',
      en: 'Telegram Shop Bot',
    },
    description: {
      fr: 'Bot e-commerce complet pour Telegram avec catalogue produits, panier et paiement intégré.',
      en: 'Complete e-commerce bot for Telegram with product catalog, cart, and integrated payment.',
    },
    price: 69.99,
    category: 'telegram',
    features: {
      fr: [
        'Catalogue produits',
        'Panier d\'achat',
        'Paiement intégré',
        'Gestion des stocks',
        'Notifications clients',
        'Dashboard admin',
      ],
      en: [
        'Product catalog',
        'Shopping cart',
        'Integrated payment',
        'Stock management',
        'Customer notifications',
        'Admin dashboard',
      ],
    },
    image: '/products/telegram-shop.png',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function searchProducts(query: string, lang: 'fr' | 'en'): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name[lang].toLowerCase().includes(lowerQuery) ||
      p.description[lang].toLowerCase().includes(lowerQuery)
  )
}
