import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthContextType, SystemConfig } from '../types'
import { storage } from '../services/storage'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(storage.getCurrentUser())
  const [isDemoMode, setIsDemoMode] = useState<boolean>(storage.isDemoMode())
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(storage.getSystemConfig())

  useEffect(() => {
    // Sincronizar Favicon e Título
    document.title = `${systemConfig.systemName} - ${systemConfig.systemShortName}`
    
    if (systemConfig.faviconUrl) {
      const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']") || document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = systemConfig.faviconUrl
      document.getElementsByTagName('head')[0].appendChild(link)
    }
  }, [systemConfig])


  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = storage.getUsers()
      const cleanEmail = email.trim().toLowerCase()
      const cleanPassword = password.trim()

      console.log('Tentando login para:', cleanEmail)
      
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword && u.isActive
      )

      console.log('Usuário encontrado:', foundUser ? 'Sim' : 'Não')

      if (foundUser) {
        setUser(foundUser)
        storage.saveCurrentUser(foundUser)
        console.log('Login bem-sucedido para:', foundUser.email)
        return true
      }

      console.log('Login falhou: credenciais não encontradas')
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    storage.saveCurrentUser(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false

    switch (permission) {
      case 'admin':
        return user.role === 'admin'
      case 'leader':
        return user.role === 'admin' || user.role === 'leader'
      case 'viewer':
        return true
      case 'create_transaction':
        return user.role === 'admin' || user.role === 'leader'
      case 'manage_users':
        return user.role === 'admin'
      case 'manage_teams':
        return user.role === 'admin' || user.role === 'leader'
      default:
        return false
    }
  }

  const updateSystemConfig = (config: Partial<SystemConfig>) => {
    const newConfig = { ...systemConfig, ...config }
    setSystemConfig(newConfig)
    storage.saveSystemConfig(newConfig)
  }

  const toggleDemoMode = () => {
    const nextMode = !isDemoMode
    storage.setDemoMode(nextMode)
    setIsDemoMode(nextMode)
    // Forçar recarregamento de página para garantir que todas as instâncias limpem o estado local
    window.location.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission,
        systemConfig,
        updateSystemConfig,
        isDemoMode,
        toggleDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

