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
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
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
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')

      if (accessToken) {
        if (supabaseUrl && supabaseKey) {
          try {
            const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${accessToken}`,
              },
            })
            if (res.ok) {
              const userData = await res.json()
              const session = {
                access_token: accessToken,
                refresh_token: refreshToken || '',
                user: { id: userData.id, email: userData.email },
              }
              localStorage.setItem('adapta_auth_session', JSON.stringify(session))
              setUser(session.user)
              setToken(accessToken)
              window.history.replaceState(
                null,
                '',
                window.location.pathname + window.location.search,
              )
            }
          } catch (e) {
            console.error('Error fetching user from hash token', e)
          }
        } else {
          // Mock
          const session = {
            access_token: accessToken,
            refresh_token: refreshToken || '',
            user: { id: 'mock-id', email: 'mock@example.com' },
          }
          localStorage.setItem('adapta_auth_session', JSON.stringify(session))
          setUser(session.user)
          setToken(accessToken)
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
      } else {
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
      }
      setIsLoading(false)
    }
    initAuth()
  }, [supabaseUrl, supabaseKey])

  const login = async (email: string, password: string) => {
    setError(null)
    if (!supabaseUrl || !supabaseKey) {
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

  const resetPassword = async (email: string) => {
    setError(null)
    if (!supabaseUrl || !supabaseKey) {
      await new Promise((r) => setTimeout(r, 1000))
      return
    }

    const redirectUrl = encodeURIComponent(`${window.location.origin}/reset-password`)
    const res = await fetch(`${supabaseUrl}/auth/v1/recover?redirect_to=${redirectUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
      },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(
        data.error_description || data.msg || 'Erro ao solicitar redefinição de senha',
      )
    }
  }

  const updatePassword = async (password: string) => {
    setError(null)
    if (!supabaseUrl || !supabaseKey) {
      await new Promise((r) => setTimeout(r, 1000))
      return
    }

    if (!token) throw new Error('Sessão expirada ou inválida. Tente o link novamente.')

    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error_description || data.msg || 'Erro ao atualizar senha')
    }
  }

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        token,
        isLoading,
        error,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
      },
    },
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
