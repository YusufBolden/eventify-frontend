import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import type { UserInfo } from '../types/User'
import type { AuthContextType, AuthProviderProps } from '../types/Auth'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    const syncLogout = () => {
      const storedUser = localStorage.getItem('userInfo')
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    window.addEventListener('storage', syncLogout)
    return () => window.removeEventListener('storage', syncLogout)
  }, [])

  const login = (userData: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
  }

  const value: AuthContextType = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
