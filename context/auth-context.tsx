'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  phone: string
  addresses: Address[]
}

export interface Address {
  id: string
  street: string
  line2?: string
  city: string
  state: string
  isDefault: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  forgotPassword: (email: string) => Promise<boolean>
  resetPassword: (email: string, otp: string, password: string) => Promise<boolean>
  updateUser: (data: Partial<User>) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  deleteAddress: (id: string) => void
  redirectAfterLogin: string | null
  setRedirectAfterLogin: (path: string | null) => void
}

interface RegisterData {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
  phone: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('nott_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo login - accept any email/password
    const newUser: User = {
      id: '1',
      email,
      firstName: 'Demo',
      lastName: 'User',
      username: email.split('@')[0],
      phone: '01012345678',
      addresses: []
    }
    
    setUser(newUser)
    localStorage.setItem('nott_user', JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: '1',
      email: 'demo@google.com',
      firstName: 'Google',
      lastName: 'User',
      username: 'googleuser',
      phone: '01012345678',
      addresses: []
    }
    
    setUser(newUser)
    localStorage.setItem('nott_user', JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: '1',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      phone: data.phone,
      addresses: []
    }
    
    setUser(newUser)
    localStorage.setItem('nott_user', JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nott_user')
  }

  const forgotPassword = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Password reset email sent to:', email)
    return true
  }

  const resetPassword = async (email: string, otp: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Password reset for:', email, otp, password)
    return true
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('nott_user', JSON.stringify(updatedUser))
    }
  }

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (user) {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString()
      }
      const updatedUser = {
        ...user,
        addresses: [...user.addresses, newAddress]
      }
      setUser(updatedUser)
      localStorage.setItem('nott_user', JSON.stringify(updatedUser))
    }
  }

  const updateAddress = (id: string, address: Partial<Address>) => {
    if (user) {
      const updatedUser = {
        ...user,
        addresses: user.addresses.map(a => 
          a.id === id ? { ...a, ...address } : a
        )
      }
      setUser(updatedUser)
      localStorage.setItem('nott_user', JSON.stringify(updatedUser))
    }
  }

  const deleteAddress = (id: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        addresses: user.addresses.filter(a => a.id !== id)
      }
      setUser(updatedUser)
      localStorage.setItem('nott_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateUser,
        addAddress,
        updateAddress,
        deleteAddress,
        redirectAfterLogin,
        setRedirectAfterLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
