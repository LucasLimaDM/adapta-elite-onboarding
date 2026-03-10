import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

type AuthUser = {
  email: string
  clientId: string
}

type SessionData = {
  user: AuthUser
  token: string
  expiresAt: number
  lastRefresh: number
}

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const mockValidateToken = async (token: string): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === 'invalid' || token === 'expired') {
        reject(new Error('Invalid token'))
      } else if (token === 'admin' || token === 'admin-token') {
        resolve({ email: 'admin@adapta.org', clientId: 'ADM-001' })
      } else {
        resolve({ email: 'client@adaptaelite.com', clientId: 'CLI-9981' })
      }
    }, 1500)
  })
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const hasInitialized = useRef(false)

  useEffect(() => {
    const urlToken = searchParams.get('token')

    if (hasInitialized.current && !urlToken) return
    hasInitialized.current = true

    const initAuth = async () => {
      const stored = localStorage.getItem('adapta_session')
      let session: SessionData | null = stored ? JSON.parse(stored) : null
      const now = Date.now()
      const DAY_MS = 24 * 60 * 60 * 1000
      const HALF_DAY_MS = 12 * 60 * 60 * 1000

      if (urlToken) {
        setIsLoading(true)
        try {
          const res = await mockValidateToken(urlToken)
          session = {
            user: res,
            token: urlToken,
            expiresAt: now + DAY_MS,
            lastRefresh: now,
          }
          localStorage.setItem('adapta_session', JSON.stringify(session))
          setUser(res)
          setError(null)

          searchParams.delete('token')
          setSearchParams(searchParams, { replace: true })

          if (location.pathname === '/') {
            // keep path if it's already on root
          } else if (res.email.endsWith('@adapta.org') && location.pathname !== '/dashboard') {
            navigate('/dashboard', { replace: true })
          } else if (location.pathname !== '/') {
            navigate('/', { replace: true })
          }
        } catch {
          setError('Link expirado ou inválido. Solicite um novo link por email.')
          localStorage.removeItem('adapta_session')
        } finally {
          setIsLoading(false)
        }
        return
      }

      if (session) {
        if (now > session.expiresAt) {
          setError('Sessão expirada. Solicite um novo link por email.')
          localStorage.removeItem('adapta_session')
          setIsLoading(false)
          return
        }

        setUser(session.user)
        setIsLoading(false)

        if (now - session.lastRefresh > HALF_DAY_MS) {
          try {
            const res = await mockValidateToken(session.token)
            session.user = res
            session.lastRefresh = now
            session.expiresAt = now + DAY_MS
            localStorage.setItem('adapta_session', JSON.stringify(session))
            setUser(res)
          } catch {
            setError('Sessão expirada. Solicite um novo link por email.')
            setUser(null)
            localStorage.removeItem('adapta_session')
          }
        }
      } else {
        setError('Acesso negado. Utilize o link seguro enviado para seu email.')
        setIsLoading(false)
      }
    }

    initAuth()
  }, [searchParams, setSearchParams, navigate, location.pathname])

  useEffect(() => {
    if (!user) return

    const interval = setInterval(async () => {
      const stored = localStorage.getItem('adapta_session')
      if (!stored) return

      const session: SessionData = JSON.parse(stored)
      const now = Date.now()
      const DAY_MS = 24 * 60 * 60 * 1000
      const HALF_DAY_MS = 12 * 60 * 60 * 1000

      if (now > session.expiresAt) {
        setUser(null)
        setError('Sessão expirada devido a inatividade (24h). Solicite um novo link.')
        localStorage.removeItem('adapta_session')
        return
      }

      if (now - session.lastRefresh > HALF_DAY_MS) {
        try {
          const res = await mockValidateToken(session.token)
          session.user = res
          session.lastRefresh = now
          session.expiresAt = now + DAY_MS
          localStorage.setItem('adapta_session', JSON.stringify(session))
          setUser(res)
        } catch {
          setUser(null)
          setError('Não foi possível renovar sua sessão. Solicite um novo link.')
          localStorage.removeItem('adapta_session')
        }
      }
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [user])

  const logout = () => {
    localStorage.removeItem('adapta_session')
    setUser(null)
    setError('Você saiu da sessão com segurança. Solicite um novo link para retornar.')
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoading, error, logout } },
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
