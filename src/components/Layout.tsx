import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Layers,
  Package,
  MapPin,
  Church,
  Database,
  RefreshCw,
} from 'lucide-react'
import { useState } from 'react'

const Layout = () => {
  const { user, logout, hasPermission, systemConfig, isDemoMode, toggleDemoMode } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isSyncing, setIsSyncing] = useState(false)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSync = () => {
    setIsSyncing(true)
    // Simular sincronização
    setTimeout(() => {
      setIsSyncing(false)
      window.location.reload()
    }, 1500)
  }

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: null },
    { path: '/finance', label: 'Financeiro', icon: DollarSign, permission: null },
    { path: '/teams', label: 'Equipes', icon: Users, permission: 'manage_teams' },
    { path: '/members', label: 'Pessoas', icon: Users, permission: null },
    { path: '/groups/categories', label: 'Categorias de Grupos', icon: Layers, permission: null },
    { path: '/assets/categories', label: 'Categorias de Patrimônio', icon: Package, permission: null },
    { path: '/assets/locations', label: 'Locais de Patrimônio', icon: MapPin, permission: null },
    {
      path: '/admin',
      label: 'Administração',
      icon: Settings,
      permission: 'manage_users',
    },
  ]

  const filteredMenuItems = menuItems.filter((item) =>
    item.permission ? hasPermission(item.permission) : true
  )

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center overflow-hidden">
                {systemConfig.logoUrl ? (
                  <img src={systemConfig.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
                ) : (
                  <Church className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                )}
              </div>
              <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400 truncate">
                {systemConfig.systemName}
              </h1>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              {systemConfig.systemShortName}
            </p>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Info & Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3 mb-6">
              {/* Sync Button */}
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors border border-primary-200 dark:border-primary-800 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-bold">Sincronizar Banco</span>
              </button>

              {/* Demo Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-bold text-orange-700 dark:text-orange-300">Modo Demo</span>
                </div>
                <button
                  onClick={toggleDemoMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    isDemoMode ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDemoMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
              <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                {user?.role === 'admin'
                  ? 'Administrador'
                  : user?.role === 'leader'
                  ? 'Líder'
                  : 'Visualizador'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Mobile */}
        <header className="lg:hidden bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {systemConfig.systemName}
            </h1>
            {isDemoMode && (
              <span className="text-[10px] font-bold text-orange-600 animate-pulse">
                MODO DEMONSTRAÇÃO ATIVO
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout

