import type { ReactNode } from 'react'
import type { UserInfo } from './User'

export type AuthContextType = {
  user: UserInfo | null
  setUser: (user: UserInfo | null) => void // profile updates sync globally
  login: (userData: UserInfo) => void
  logout: () => void
}

export type AuthProviderProps = {
  children: ReactNode
}
