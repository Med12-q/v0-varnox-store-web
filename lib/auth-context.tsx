'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client'

type AuthContextType = {
  user: { id: string; name: string; email: string; image?: string | null } | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  addPurchase: (productId: string) => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession()
  const router = useRouter()
  const login = async (email: string, password: string) => { const result = await signIn.email({ email, password }); if (result.error) return false; router.refresh(); return true }
  const register = async (name: string, email: string, password: string) => { const result = await signUp.email({ name, email, password }); if (result.error) return false; router.refresh(); return true }
  const logout = async () => { await signOut(); router.refresh() }
  const addPurchase = (_productId: string) => {}
  return <AuthContext.Provider value={{ user: data?.user ?? null, isLoading: isPending, login, register, logout, addPurchase }}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within AuthProvider'); return context }
