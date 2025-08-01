import { createContext } from 'react'
import type { AuthContextType } from '../types/Auth'

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}, // so type matches even in default value
  login: () => {},
  logout: () => {},
})
