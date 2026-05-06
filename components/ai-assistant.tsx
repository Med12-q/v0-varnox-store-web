'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Sparkles } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const DEVELOPER_NAME = 'VARNOX PRIME TECH OFFICIAL'

export function AIAssistant() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = language === 'fr' ? 'fr-FR' : 'en-US'

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    // Welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: t.assistant.welcome,
          timestamp: new Date(),
        },
      ])
    }
  }, [language, t.assistant.welcome, messages.length])

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === 'fr' ? 'fr-FR' : 'en-US'
    }
  }, [language])

  // Scroll to bottom when new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const speak = useCallback((text: string) => {
    if (synthRef.current && voiceEnabled) {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      synthRef.current.speak(utterance)
    }
  }, [language, voiceEnabled])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const stopSpeaking = () => {
    synthRef.current?.cancel()
    setIsSpeaking(false)
  }

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Developer question
    if (
      lowerMessage.includes('développeur') ||
      lowerMessage.includes('developer') ||
      lowerMessage.includes('créateur') ||
      lowerMessage.includes('creator') ||
      lowerMessage.includes('qui t\'a créé') ||
      lowerMessage.includes('who created') ||
      lowerMessage.includes('who made')
    ) {
      return language === 'fr'
        ? `Mon développeur est ${DEVELOPER_NAME}. Il a créé VARNOX STORE pour vous offrir les meilleurs scripts et bots d'automatisation.`
        : `My developer is ${DEVELOPER_NAME}. He created VARNOX STORE to offer you the best automation scripts and bots.`
    }

    // Products
    if (
      lowerMessage.includes('produit') ||
      lowerMessage.includes('product') ||
      lowerMessage.includes('bot') ||
      lowerMessage.includes('script')
    ) {
      return language === 'fr'
        ? 'Nous proposons plusieurs produits : des bots WhatsApp, des bots Telegram, des outils d\'automatisation et des scripts IA. Visitez notre page Produits pour en savoir plus !'
        : 'We offer several products: WhatsApp bots, Telegram bots, automation tools, and AI scripts. Visit our Products page to learn more!'
    }

    // Prices
    if (
      lowerMessage.includes('prix') ||
      lowerMessage.includes('price') ||
      lowerMessage.includes('coût') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('tarif')
    ) {
      return language === 'fr'
        ? 'Nos prix varient de $39.99 à $89.99 selon le produit. Chaque script inclut un support 24/7 et des mises à jour gratuites.'
        : 'Our prices range from $39.99 to $89.99 depending on the product. Each script includes 24/7 support and free updates.'
    }

    // Help
    if (
      lowerMessage.includes('aide') ||
      lowerMessage.includes('help') ||
      lowerMessage.includes('comment') ||
      lowerMessage.includes('how')
    ) {
      return language === 'fr'
        ? 'Je peux vous aider avec : informations sur les produits, prix, processus d\'achat, et support technique. Que souhaitez-vous savoir ?'
        : 'I can help you with: product information, pricing, purchase process, and technical support. What would you like to know?'
    }

    // Greetings
    if (
      lowerMessage.includes('bonjour') ||
      lowerMessage.includes('hello') ||
      lowerMessage.includes('salut') ||
      lowerMessage.includes('hi')
    ) {
      return language === 'fr'
        ? 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?'
        : 'Hello! How can I help you today?'
    }

    // Thank you
    if (
      lowerMessage.includes('merci') ||
      lowerMessage.includes('thank')
    ) {
      return language === 'fr'
        ? 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions.'
        : 'You\'re welcome! Feel free to ask if you have any other questions.'
    }

    // Default
    return language === 'fr'
      ? 'Je suis l\'assistant IA de VARNOX STORE. Je peux vous renseigner sur nos produits, les prix, et répondre à vos questions. Que puis-je faire pour vous ?'
      : 'I\'m the VARNOX STORE AI assistant. I can inform you about our products, pricing, and answer your questions. What can I do for you?'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const responseText = generateResponse(userMessage.content)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)

    // Speak the response
    if (voiceEnabled) {
      speak(responseText)
    }
  }

  return (
    <Card className="glass border-border/50 flex flex-col h-[600px] max-h-[80vh]">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t.assistant.title}</h3>
            <p className="text-xs text-muted-foreground">{t.assistant.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={voiceEnabled ? 'text-primary' : 'text-muted-foreground'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          {isSpeaking && (
            <Button variant="ghost" size="icon" onClick={stopSpeaking} className="text-accent">
              <VolumeX className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' ? 'bg-primary/20' : 'bg-accent/20'
              }`}
            >
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Sparkles className="w-4 h-4 text-accent" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-secondary text-secondary-foreground rounded-tl-sm'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-[10px] opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <span
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={`border-border ${isListening ? 'bg-primary text-primary-foreground animate-pulse' : ''}`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? t.assistant.listening : t.assistant.placeholder}
            className="flex-1 bg-input border-border focus:border-primary"
            disabled={isListening}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isListening && (
          <p className="text-xs text-primary mt-2 text-center animate-pulse">{t.assistant.listening}</p>
        )}
      </form>
    </Card>
  )
}

// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}
