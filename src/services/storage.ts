const STORAGE_KEYS = {
  USERS: 'gestao_admac_users',
  TRANSACTIONS: 'gestao_admac_transactions',
  TEAMS: 'gestao_admac_teams',
  CURRENT_USER: 'gestao_admac_current_user',
  THEME: 'gestao_admac_theme',
  GROUP_CATEGORIES: 'gestao_admac_group_categories',
  ASSET_CATEGORIES: 'gestao_admac_asset_categories',
  LOCATIONS: 'gestao_admac_locations',
  SYSTEM_CONFIG: 'gestao_admac_system_config',
  IS_DEMO: 'gestao_admac_is_demo',
}

// Chaves que DEVEM ser globais (não isoladas pelo prefixo demo_)
const GLOBAL_KEYS = [
  STORAGE_KEYS.CURRENT_USER,
  STORAGE_KEYS.THEME,
  STORAGE_KEYS.SYSTEM_CONFIG,
  STORAGE_KEYS.IS_DEMO,
]

// Função auxiliar para verificar se localStorage está disponível
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

// Função auxiliar para obter o prefixo das chaves (Demo Mode)
const getPrefix = (): string => {
  if (!isLocalStorageAvailable()) return ''
  const isDemo = localStorage.getItem(STORAGE_KEYS.IS_DEMO) === 'true'
  return isDemo ? 'demo_' : ''
}

const getFullKey = (key: string): string => {
  if (GLOBAL_KEYS.includes(key)) {
    return key
  }
  return `${getPrefix()}${key}`
}

export const storage = {
  // Demo Mode Control
  isDemoMode: (): boolean => {
    if (!isLocalStorageAvailable()) return false
    return localStorage.getItem(STORAGE_KEYS.IS_DEMO) === 'true'
  },

  setDemoMode: (isDemo: boolean) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(STORAGE_KEYS.IS_DEMO, String(isDemo))
  },

  // Users
  getUsers: (): any[] => {
    const now = new Date()
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0')
    const currentDay = String(now.getDate()).padStart(2, '0')
    
    const defaultUsers = [
      {
        id: '1',
        name: 'Administrador',
        lastName: 'Sistema',
        email: 'admin@igreja.com',
        password: 'admin123',
        role: 'admin' as const,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
        birthDate: `1985-${currentMonth}-01`, // Aniversário no início do mês
        phone1: '(11) 99999-9999',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Líder',
        lastName: 'de Equipe',
        email: 'lider@igreja.com',
        password: 'lider123',
        role: 'leader' as const,
        teamId: '1',
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
        birthDate: `1990-${currentMonth}-${currentDay}`, // Aniversário HOJE
        phone1: '(11) 88888-8888',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Membro',
        lastName: 'Demonstração',
        email: 'viewer@igreja.com',
        password: 'viewer123',
        role: 'viewer' as const,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
        birthDate: '1995-10-20',
        createdAt: new Date().toISOString(),
      },
    ]

    if (!isLocalStorageAvailable()) return defaultUsers
    
    try {
      const fullKey = getFullKey(STORAGE_KEYS.USERS)
      const data = localStorage.getItem(fullKey)
      
      // Se estiver no modo demo e não houver dados, ou se formos forçar a atualização dos usuários base
      if (!data && storage.isDemoMode()) {
        localStorage.setItem(fullKey, JSON.stringify(defaultUsers))
        return defaultUsers
      }

      if (!data) return defaultUsers

      const parsed = JSON.parse(data)
      if (!Array.isArray(parsed) || parsed.length === 0) return defaultUsers

      return parsed
    } catch (error) {
      console.error('Erro ao ler usuários:', error)
      return defaultUsers
    }
  },

  saveUsers: (users: any[]) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(getFullKey(STORAGE_KEYS.USERS), JSON.stringify(users))
  },

  // Transactions
  getTransactions: (): any[] => {
    if (!isLocalStorageAvailable()) return []
    try {
      const fullKey = getFullKey(STORAGE_KEYS.TRANSACTIONS)
      const data = localStorage.getItem(fullKey)
      
      if (!data && storage.isDemoMode()) {
        const demoTransactions = [
          {
            id: 'demo1',
            type: 'income',
            amount: 7500.50,
            description: 'Dízimos e Ofertas - Culto de Celebração',
            category: 'Dízimos',
            userId: '1',
            date: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
          {
            id: 'demo2',
            type: 'expense',
            amount: 1500.00,
            description: 'Pagamento de Energia Elétrica',
            category: 'Contas Fixas',
            userId: '1',
            date: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          }
        ]
        localStorage.setItem(fullKey, JSON.stringify(demoTransactions))
        return demoTransactions
      }

      return data ? JSON.parse(data) : []
    } catch (error) {
      return []
    }
  },

  saveTransactions: (transactions: any[]) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(getFullKey(STORAGE_KEYS.TRANSACTIONS), JSON.stringify(transactions))
  },

  // Teams
  getTeams: (): any[] => {
    if (!isLocalStorageAvailable()) return []
    try {
      const fullKey = getFullKey(STORAGE_KEYS.TEAMS)
      const data = localStorage.getItem(fullKey)
      const defaultTeams = [
        { id: '1', name: 'Louvor', leaderId: '2', description: 'Equipe de louvor', createdAt: new Date().toISOString() },
        { id: 'kids', name: 'Kids', description: 'Departamento infantil', createdAt: new Date().toISOString() },
        { id: 'jovens', name: 'Jovens Admac', description: 'Ministério de Jovens', createdAt: new Date().toISOString() },
      ]

      if (!data && storage.isDemoMode()) {
        localStorage.setItem(fullKey, JSON.stringify(defaultTeams))
        return defaultTeams
      }
      return data ? JSON.parse(data) : defaultTeams
    } catch (error) {
      return []
    }
  },

  saveTeams: (teams: any[]) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(getFullKey(STORAGE_KEYS.TEAMS), JSON.stringify(teams))
  },

  // Global Session
  getCurrentUser: (): any | null => {
    if (!isLocalStorageAvailable()) return null
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
      return data ? JSON.parse(data) : null
    } catch (error) {
      return null
    }
  },

  saveCurrentUser: (user: any | null) => {
    if (!isLocalStorageAvailable()) return
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
      }
    } catch (error) {}
  },

  // Global Config
  getSystemConfig: (): any => {
    const defaultConfig = { systemName: 'Gestão Igreja', systemShortName: 'Sistema Financeiro', logoUrl: '', faviconUrl: '' }
    if (!isLocalStorageAvailable()) return defaultConfig
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SYSTEM_CONFIG)
      return data ? JSON.parse(data) : defaultConfig
    } catch (error) {
      return defaultConfig
    }
  },

  saveSystemConfig: (config: any) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(STORAGE_KEYS.SYSTEM_CONFIG, JSON.stringify(config))
  },

  getTheme: (): 'light' | 'dark' => {
    if (!isLocalStorageAvailable()) return 'light'
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light'
  },

  saveTheme: (theme: 'light' | 'dark') => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  },

  // Isolated Metadata
  getGroupCategories: () => {
    const fullKey = getFullKey(STORAGE_KEYS.GROUP_CATEGORIES)
    const data = localStorage.getItem(fullKey)
    return data ? JSON.parse(data) : []
  },
  saveGroupCategories: (data: any[]) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(getFullKey(STORAGE_KEYS.GROUP_CATEGORIES), JSON.stringify(data))
  },
  getAssetCategories: () => {
    const fullKey = getFullKey(STORAGE_KEYS.ASSET_CATEGORIES)
    const data = localStorage.getItem(fullKey)
    return data ? JSON.parse(data) : []
  },
  saveAssetCategories: (data: any[]) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(getFullKey(STORAGE_KEYS.ASSET_CATEGORIES), JSON.stringify(data))
  },
  getLocations: () => {
    const fullKey = getFullKey(STORAGE_KEYS.LOCATIONS)
    const data = localStorage.getItem(fullKey)
    return data ? JSON.parse(data) : []
  },
  saveLocations: (data: any[]) => {
    if (!isLocalStorageAvailable()) return
    localStorage.setItem(getFullKey(STORAGE_KEYS.LOCATIONS), JSON.stringify(data))
  },
}
