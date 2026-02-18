export type UserRole = 'admin' | 'leader' | 'viewer'

export interface User {
  id: string
  name: string
  lastName?: string
  email: string
  password: string
  role: UserRole
  teamId?: string
  isActive: boolean
  createdAt: string
  // Dados de Membro/Pessoa
  imageUrl?: string
  birthDate?: string
  gender?: 'Masculino' | 'Feminino'
  education?: string
  maritalStatus?: string
  document1?: string
  document2?: string
  phone1?: string
  phone2?: string
  address?: {
    street?: string
    number?: string
    neighborhood?: string
    zipCode?: string
    city?: string
    state?: string
  }
  notes?: string
  categories?: string[]
  positions?: string[]
  conversionDate?: string
  isBaptized?: boolean
}

export interface Team {
  id: string
  name: string
  leaderId?: string
  description?: string
  imageUrl?: string
  createdAt: string
}

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  category: string
  teamId?: string
  userId: string
  date: string
  createdAt: string
}

export interface FinanceSummary {
  totalIncome: number
  totalExpense: number
  balance: number
  monthlyData: MonthlyData[]
}

export interface MonthlyData {
  month: string
  income: number
  expense: number
}

export interface SystemConfig {
  systemName: string
  systemShortName: string
  logoUrl?: string
  faviconUrl?: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  hasPermission: (permission: string) => boolean
  systemConfig: SystemConfig
  updateSystemConfig: (config: Partial<SystemConfig>) => void
  isDemoMode: boolean
  toggleDemoMode: () => void
}

export interface GroupCategory {
  id: string
  name: string
  description?: string
  groupCount: number
  createdAt: string
}

export interface AssetCategory {
  id: string
  name: string
  description?: string
  createdAt: string
}

export interface AssetLocation {
  id: string
  name: string
  description?: string
  createdAt: string
}

export interface FinanceContextType {
  transactions: Transaction[]
  teams: Team[]
  users: User[]
  groupCategories: GroupCategory[]
  assetCategories: AssetCategory[]
  locations: AssetLocation[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  addTeam: (team: Omit<Team, 'id' | 'createdAt'>) => void
  updateTeam: (id: string, team: Partial<Team>) => void
  deleteTeam: (id: string) => void
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  // Group Categories
  addGroupCategory: (category: Omit<GroupCategory, 'id' | 'createdAt' | 'groupCount'>) => void
  updateGroupCategory: (id: string, category: Partial<GroupCategory>) => void
  deleteGroupCategory: (id: string) => void
  // Asset Categories
  addAssetCategory: (category: Omit<AssetCategory, 'id' | 'createdAt'>) => void
  updateAssetCategory: (id: string, category: Partial<AssetCategory>) => void
  deleteAssetCategory: (id: string) => void
  // Locations
  addLocation: (location: Omit<AssetLocation, 'id' | 'createdAt'>) => void
  updateLocation: (id: string, location: Partial<AssetLocation>) => void
  deleteLocation: (id: string) => void
  getFinanceSummary: (startDate?: Date, endDate?: Date, teamId?: string) => FinanceSummary
}

