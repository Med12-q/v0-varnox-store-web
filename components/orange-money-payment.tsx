'use client'

import { useState } from 'react'
import { Copy, Check, Smartphone, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function OrangeMoneyPayment({ orderId, amount }: { orderId: string; amount: number }) {
  const [reference, setReference] = useState('')
  const [copied, setCopied] = useState(false)
  const copyNumber = async () => { await navigator.clipboard.writeText('+224610835573'); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const sendMessage = encodeURIComponent(`Paiement Orange Money VARNOX STORE\nCommande: ${orderId}\nMontant: $${amount} USD\nRéférence: ${reference || 'à compléter'}`)
  return <div className="mt-5 rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 space-y-4">
    <div className="flex items-center gap-3"><div className="rounded-lg bg-orange-500/15 p-2"><Smartphone className="h-5 w-5 text-orange-400" /></div><div><h4 className="font-semibold">Orange Money Guinée</h4><p className="text-xs text-muted-foreground">Transfert national ou international</p></div></div>
    <div className="flex items-center justify-between rounded-lg bg-background/70 px-3 py-2"><span className="font-mono text-sm">+224 610 835 573</span><Button type="button" size="sm" variant="ghost" onClick={copyNumber} aria-label="Copier le numéro">{copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}</Button></div>
    <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Référence du transfert (optionnel)" aria-label="Référence du transfert" />
    <a href={`https://wa.me/224669288332?text=${sendMessage}`} target="_blank" rel="noreferrer" className="flex h-10 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-medium text-white transition hover:bg-orange-700"><ExternalLink className="h-4 w-4" />Envoyer la preuve via WhatsApp</a>
    <p className="text-[11px] leading-relaxed text-muted-foreground">Après le transfert, envoyez la référence et la capture de preuve. La commande sera vérifiée manuellement par l’administration.</p>
  </div>
}
