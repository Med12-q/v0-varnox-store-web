export type Language = 'fr' | 'en'

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      products: 'Produits',
      assistant: 'Assistant IA',
      dashboard: 'Tableau de bord',
      login: 'Connexion',
      register: "S'inscrire",
      logout: 'Déconnexion',
    },
    // Hero
    hero: {
      title: 'VARNOX STORE',
      subtitle: 'Scripts & Bots Premium',
      description: 'Découvrez notre collection exclusive de bots WhatsApp, Telegram et outils d\'automatisation professionnels.',
      cta: 'Explorer les produits',
      secondary: 'Parler à l\'assistant',
    },
    // Products
    products: {
      title: 'Nos Produits',
      subtitle: 'Des solutions d\'automatisation puissantes pour votre business',
      buy: 'Acheter',
      details: 'Détails',
      price: 'Prix',
      category: 'Catégorie',
      search: 'Rechercher un produit...',
      noProducts: 'Aucun produit trouvé',
      addToCart: 'Ajouter au panier',
      buyNow: 'Acheter maintenant',
    },
    // Categories
    categories: {
      all: 'Tous',
      whatsapp: 'WhatsApp Bots',
      telegram: 'Telegram Bots',
      automation: 'Automatisation',
      ai: 'Intelligence Artificielle',
    },
    // AI Assistant
    assistant: {
      title: 'Assistant IA VARNOX',
      subtitle: 'Posez vos questions, je suis là pour vous aider',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      listening: 'Écoute en cours...',
      speaking: 'Parle...',
      voiceMode: 'Mode vocal',
      textMode: 'Mode texte',
      welcome: 'Bonjour ! Je suis l\'assistant IA de VARNOX STORE. Comment puis-je vous aider aujourd\'hui ?',
      developer: 'Mon développeur est VARNOX PRIME TECH OFFICIAL.',
    },
    // Auth
    auth: {
      login: 'Connexion',
      register: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      name: 'Nom complet',
      forgotPassword: 'Mot de passe oublié ?',
      noAccount: 'Pas de compte ?',
      hasAccount: 'Déjà un compte ?',
      createAccount: 'Créer un compte',
      loginNow: 'Se connecter',
    },
    // Dashboard
    dashboard: {
      title: 'Tableau de bord',
      welcome: 'Bienvenue',
      myPurchases: 'Mes achats',
      myScripts: 'Mes scripts',
      download: 'Télécharger',
      noPurchases: 'Aucun achat pour le moment',
      orderDate: 'Date de commande',
      status: 'Statut',
      completed: 'Terminé',
      pending: 'En attente',
    },
    // Footer
    footer: {
      rights: 'Tous droits réservés',
      contact: 'Contact',
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialité',
    },
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      success: 'Succès',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      products: 'Products',
      assistant: 'AI Assistant',
      dashboard: 'Dashboard',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
    },
    // Hero
    hero: {
      title: 'VARNOX STORE',
      subtitle: 'Premium Scripts & Bots',
      description: 'Discover our exclusive collection of WhatsApp bots, Telegram bots and professional automation tools.',
      cta: 'Explore Products',
      secondary: 'Talk to Assistant',
    },
    // Products
    products: {
      title: 'Our Products',
      subtitle: 'Powerful automation solutions for your business',
      buy: 'Buy',
      details: 'Details',
      price: 'Price',
      category: 'Category',
      search: 'Search for a product...',
      noProducts: 'No products found',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
    },
    // Categories
    categories: {
      all: 'All',
      whatsapp: 'WhatsApp Bots',
      telegram: 'Telegram Bots',
      automation: 'Automation',
      ai: 'Artificial Intelligence',
    },
    // AI Assistant
    assistant: {
      title: 'VARNOX AI Assistant',
      subtitle: 'Ask your questions, I\'m here to help',
      placeholder: 'Type your message...',
      send: 'Send',
      listening: 'Listening...',
      speaking: 'Speaking...',
      voiceMode: 'Voice mode',
      textMode: 'Text mode',
      welcome: 'Hello! I\'m the VARNOX STORE AI assistant. How can I help you today?',
      developer: 'My developer is VARNOX PRIME TECH OFFICIAL.',
    },
    // Auth
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      forgotPassword: 'Forgot password?',
      noAccount: 'No account?',
      hasAccount: 'Already have an account?',
      createAccount: 'Create Account',
      loginNow: 'Login Now',
    },
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome',
      myPurchases: 'My Purchases',
      myScripts: 'My Scripts',
      download: 'Download',
      noPurchases: 'No purchases yet',
      orderDate: 'Order Date',
      status: 'Status',
      completed: 'Completed',
      pending: 'Pending',
    },
    // Footer
    footer: {
      rights: 'All rights reserved',
      contact: 'Contact',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
    },
  },
}

export function getTranslation(lang: Language) {
  return { ...translations[lang], language: lang }
}

export type Translation = ReturnType<typeof getTranslation>
