import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Transaction, Team, User, FinanceContextType, FinanceSummary, MonthlyData, GroupCategory, AssetCategory, AssetLocation } from '../types'
import { storage } from '../services/storage'
import { startOfMonth, endOfMonth, parseISO, subMonths } from 'date-fns'

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance deve ser usado dentro de FinanceProvider')
  }
  return context
}

interface FinanceProviderProps {
  children: ReactNode
}

export const FinanceProvider = ({ children }: FinanceProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [groupCategories, setGroupCategories] = useState<GroupCategory[]>([])
  const [assetCategories, setAssetCategories] = useState<AssetCategory[]>([])
  const [locations, setLocations] = useState<AssetLocation[]>([])

  useEffect(() => {
    // Carregar dados do localStorage
    setTransactions(storage.getTransactions())
    setTeams(storage.getTeams())
    setUsers(storage.getUsers())
    setGroupCategories(storage.getGroupCategories())
    setAssetCategories(storage.getAssetCategories())
    setLocations(storage.getLocations())
  }, [])

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...transactions, newTransaction]
    setTransactions(updated)
    storage.saveTransactions(updated)
  }

  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    const updated = transactions.map((t) =>
      t.id === id ? { ...t, ...transaction } : t
    )
    setTransactions(updated)
    storage.saveTransactions(updated)
  }

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id)
    setTransactions(updated)
    storage.saveTransactions(updated)
  }

  const addTeam = (team: Omit<Team, 'id' | 'createdAt'>) => {
    const newTeam: Team = {
      ...team,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...teams, newTeam]
    setTeams(updated)
    storage.saveTeams(updated)
  }

  const updateTeam = (id: string, team: Partial<Team>) => {
    const updated = teams.map((t) => (t.id === id ? { ...t, ...team } : t))
    setTeams(updated)
    storage.saveTeams(updated)
  }

  const deleteTeam = (id: string) => {
    const updated = teams.filter((t) => t.id !== id)
    setTeams(updated)
    storage.saveTeams(updated)
  }

  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...users, newUser]
    setUsers(updated)
    storage.saveUsers(updated)
  }

  const updateUser = (id: string, user: Partial<User>) => {
    const updated = users.map((u) => (u.id === id ? { ...u, ...user } : u))
    setUsers(updated)
    storage.saveUsers(updated)
  }

  const deleteUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id)
    setUsers(updated)
    storage.saveUsers(updated)
  }

  // Group Categories
  const addGroupCategory = (category: Omit<GroupCategory, 'id' | 'createdAt' | 'groupCount'>) => {
    const newCategory: GroupCategory = {
      ...category,
      id: Date.now().toString(),
      groupCount: 0,
      createdAt: new Date().toISOString(),
    }
    const updated = [...groupCategories, newCategory]
    setGroupCategories(updated)
    storage.saveGroupCategories(updated)
  }

  const updateGroupCategory = (id: string, category: Partial<GroupCategory>) => {
    const updated = groupCategories.map((c) => (c.id === id ? { ...c, ...category } : c))
    setGroupCategories(updated)
    storage.saveGroupCategories(updated)
  }

  const deleteGroupCategory = (id: string) => {
    const updated = groupCategories.filter((c) => c.id !== id)
    setGroupCategories(updated)
    storage.saveGroupCategories(updated)
  }

  // Asset Categories
  const addAssetCategory = (category: Omit<AssetCategory, 'id' | 'createdAt'>) => {
    const newCategory: AssetCategory = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...assetCategories, newCategory]
    setAssetCategories(updated)
    storage.saveAssetCategories(updated)
  }

  const updateAssetCategory = (id: string, category: Partial<AssetCategory>) => {
    const updated = assetCategories.map((c) => (c.id === id ? { ...c, ...category } : c))
    setAssetCategories(updated)
    storage.saveAssetCategories(updated)
  }

  const deleteAssetCategory = (id: string) => {
    const updated = assetCategories.filter((c) => c.id !== id)
    setAssetCategories(updated)
    storage.saveAssetCategories(updated)
  }

  // Locations
  const addLocation = (location: Omit<AssetLocation, 'id' | 'createdAt'>) => {
    const newLocation: AssetLocation = {
      ...location,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...locations, newLocation]
    setLocations(updated)
    storage.saveLocations(updated)
  }

  const updateLocation = (id: string, location: Partial<AssetLocation>) => {
    const updated = locations.map((l) => (l.id === id ? { ...l, ...location } : l))
    setLocations(updated)
    storage.saveLocations(updated)
  }

  const deleteLocation = (id: string) => {
    const updated = locations.filter((l) => l.id !== id)
    setLocations(updated)
    storage.saveLocations(updated)
  }

  const getFinanceSummary = (
    startDate?: Date,
    endDate?: Date,
    teamId?: string
  ): FinanceSummary => {
    let filtered = transactions

    // Filtrar por data
    if (startDate || endDate) {
      filtered = filtered.filter((t) => {
        const transactionDate = parseISO(t.date)
        if (startDate && transactionDate < startDate) return false
        if (endDate && transactionDate > endDate) return false
        return true
      })
    }

    // Filtrar por equipe
    if (teamId) {
      filtered = filtered.filter((t) => t.teamId === teamId)
    }

    // Calcular totais
    const totalIncome = filtered
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = filtered
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    // Agrupar por mês (últimos 6 meses)
    const monthlyData: MonthlyData[] = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(new Date(), i))
      const monthEnd = endOfMonth(monthStart)
      const monthTransactions = filtered.filter((t) => {
        const transactionDate = parseISO(t.date)
        return transactionDate >= monthStart && transactionDate <= monthEnd
      })

      const income = monthTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

      const expense = monthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

      // Formatar mês (ex: "Jan/2024")
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      const monthIndex = monthStart.getMonth()
      const year = monthStart.getFullYear()
      const monthLabel = `${monthNames[monthIndex]}/${year}`
      
      monthlyData.push({
        month: monthLabel,
        income,
        expense,
      })
    }

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      monthlyData,
    }
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        teams,
        users,
        groupCategories,
        assetCategories,
        locations,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addTeam,
        updateTeam,
        deleteTeam,
        addUser,
        updateUser,
        deleteUser,
        addGroupCategory,
        updateGroupCategory,
        deleteGroupCategory,
        addAssetCategory,
        updateAssetCategory,
        deleteAssetCategory,
        addLocation,
        updateLocation,
        deleteLocation,
        getFinanceSummary,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

