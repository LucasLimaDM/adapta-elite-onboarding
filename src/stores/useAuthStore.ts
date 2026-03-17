import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthUser = {
  id: string
  email: string
}

type AuthSession = {
  access_token: string
  refresh_token: string
  user: AuthUser
}

type AuthContextType = {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  useEffect(() => {
    const initAuth = async () => {
      const stored = localStorage.getItem('adapta_auth_session')
      if (stored) {
        try {
          const session: AuthSession = JSON.parse(stored)
          setUser(session.user)
          setToken(session.access_token)
        } catch (e) {
          localStorage.removeItem('adapta_auth_session')
        }
      }
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    if (!supabaseUrl || !supabaseKey) {
      // Mock login for development without variables
      await new Promise((r) => setTimeout(r, 1000))
      if (password === 'password') {
        const session = {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
          user: { id: 'mock-id', email },
        }
        localStorage.setItem('adapta_auth_session', JSON.stringify(session))
        setUser(session.user)
        setToken(session.access_token)
        return
      }
      throw new Error('Credenciais inválidas. (use a senha "password" para teste)')
    }

    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error_description || data.msg || 'Erro ao fazer login')
    }

    const session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      user: { id: data.user.id, email: data.user.email },
    }
    localStorage.setItem('adapta_auth_session', JSON.stringify(session))
    setUser(session.user)
    setToken(session.access_token)
  }

  const signup = async (email: string, password: string) => {
    setError(null)
    if (!supabaseUrl || !supabaseKey) {
      // Mock signup for development without variables
      await new Promise((r) => setTimeout(r, 1000))
      const session = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh',
        user: { id: 'mock-id', email },
      }
      localStorage.setItem('adapta_auth_session', JSON.stringify(session))
      setUser(session.user)
      setToken(session.access_token)
      return
    }

    const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error_description || data.msg || 'Erro ao criar conta')
    }

    const session = {
      access_token: data.access_token || data.session?.access_token,
      refresh_token: data.refresh_token || data.session?.refresh_token,
      user: { id: data.user?.id || data.id, email: data.user?.email || data.email },
    }

    if (session.access_token) {
      localStorage.setItem('adapta_auth_session', JSON.stringify(session))
      setUser(session.user)
      setToken(session.access_token)
    } else {
      throw new Error('Verifique seu e-mail para confirmar a conta.')
    }
  }

  const logout = () => {
    localStorage.removeItem('adapta_auth_session')
    setUser(null)
    setToken(null)
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { user, token, isLoading, error, login, signup, logout } },
    children,
  )
}

export default function useAuthStore() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthStore must be used within an AuthProvider')
  }
  return context
}
