'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Headphones } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function QuickChat() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const quickReplies = [
    {
      label: language === 'fr' ? 'Prix des scripts' : 'Script prices',
      message: language === 'fr' ? 'Bonjour, je voudrais connaitre les prix des scripts' : 'Hello, I would like to know the script prices'
    },
    {
      label: language === 'fr' ? 'Support technique' : 'Technical support',
      message: language === 'fr' ? 'J\'ai besoin d\'aide technique' : 'I need technical help'
    },
    {
      label: language === 'fr' ? 'Commande en cours' : 'Order status',
      message: language === 'fr' ? 'Je voudrais le statut de ma commande' : 'I would like my order status'
    }
  ]

  const handleSend = (text: string) => {
    const encodedMessage = encodeURIComponent(text || message)
    window.open(`https://wa.me/+224669288332?text=${encodedMessage}`, '_blank')
    setMessage('')
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 left-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-muted-foreground/20 text-foreground rotate-90' 
            : 'bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-40 left-4 z-50 w-80 bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">VARNOX Support</h3>
                <p className="text-xs text-white/80">
                  {language === 'fr' ? 'En ligne - Reponse rapide' : 'Online - Fast response'}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'fr' 
                ? 'Bonjour! Comment pouvons-nous vous aider?' 
                : 'Hello! How can we help you?'}
            </p>

            {/* Quick replies */}
            <div className="space-y-2 mb-4">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(reply.message)}
                  className="w-full text-left text-sm px-3 py-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && message && handleSend(message)}
                placeholder={language === 'fr' ? 'Votre message...' : 'Your message...'}
                className="flex-1 px-3 py-2 text-sm bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50"
              />
              <button
                onClick={() => message && handleSend(message)}
                disabled={!message}
                className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#128C7E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
