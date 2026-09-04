'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
const ADMIN_PASSWORD = 'varnoxStore224varnox'
type AdminContextType = { isAdmin: boolean; isAdminLoading: boolean; loginAdmin: (password: string) => boolean; logoutAdmin: () => void; isAuthenticated: boolean; login: (password: string) => boolean; logout: () => void }
const AdminContext = createContext<AdminContextType | undefined>(undefined)
export function AdminProvider({ children }: { children: ReactNode }) { const [isAdmin, setIsAdmin] = useState(false); const [isAdminLoading, setIsAdminLoading] = useState(true); useEffect(() => { setIsAdmin(localStorage.getItem('varnox-admin-session') === 'active'); setIsAdminLoading(false) }, []); const loginAdmin = (password: string) => { const ok = password === ADMIN_PASSWORD; if (ok) { setIsAdmin(true); localStorage.setItem('varnox-admin-session', 'active') }; return ok }; const logoutAdmin = () => { setIsAdmin(false); localStorage.removeItem('varnox-admin-session') }; return <AdminContext.Provider value={{ isAdmin, isAdminLoading, loginAdmin, logoutAdmin, isAuthenticated: isAdmin, login: loginAdmin, logout: logoutAdmin }}>{children}</AdminContext.Provider> }
export function useAdmin() { const context = useContext(AdminContext); if (!context) throw new Error('useAdmin must be used within an AdminProvider'); return context }
