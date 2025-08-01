import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import type { UserInfo } from '../types/User'
import type { AuthContextType, AuthProviderProps } from '../types/Auth'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInfo | null>(null)

  // Load stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Sync logout/login changes across tabs
  useEffect(() => {
    const syncAuthState = () => {
      const storedUser = localStorage.getItem('userInfo')
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    window.addEventListener('storage', syncAuthState)
    return () => window.removeEventListener('storage', syncAuthState)
  }, [])

  const login = (userData: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    setUser, // profile updates can sync immediately
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
