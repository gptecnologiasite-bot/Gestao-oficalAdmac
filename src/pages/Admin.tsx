import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import {
  Plus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Key,
  Shield,
  User,
  Eye,
  Settings,
} from 'lucide-react'
import UserModal from '../components/UserModal'

const Admin = () => {
  const { users, teams, updateUser, deleteUser } = useFinance()
  const { hasPermission } = useAuth()
  const { showToast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'users' | 'settings'>('users')
  const { systemConfig, updateSystemConfig } = useAuth()

  // Settings State
  const [sysName, setSysName] = useState(systemConfig.systemName)
  const [sysShortName, setSysShortName] = useState(systemConfig.systemShortName)
  const [sysLogo, setSysLogo] = useState(systemConfig.logoUrl || '')
  const [sysFavicon, setSysFavicon] = useState(systemConfig.faviconUrl || '')

  const canEdit = hasPermission('manage_users')

  if (!canEdit) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Acesso Negado
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    )
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      deleteUser(id)
      showToast('Usuário excluído com sucesso!', 'success')
    }
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateUser(id, { isActive: !isActive })
    showToast(
      `Usuário ${!isActive ? 'ativado' : 'desativado'} com sucesso!`,
      'success'
    )
  }

  const handleResetPassword = (id: string) => {
    if (window.confirm('Deseja resetar a senha deste usuário para "senha123"?')) {
      updateUser(id, { password: 'senha123' })
      showToast('Senha resetada com sucesso!', 'success')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingUser(null)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield
      case 'leader':
        return User
      default:
        return Eye
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador'
      case 'leader':
        return 'Líder'
      default:
        return 'Visualizador'
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'users'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Usuários
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'settings'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Configurações do Sistema
        </button>
      </div>

      {activeTab === 'users' ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Usuários
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Gerencie usuários e permissões
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Usuário
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Função
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Equipe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => {
                    const RoleIcon = getRoleIcon(user.role)
                    const team = teams.find((t) => t.id === user.teamId)

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                              {user.imageUrl ? (
                                <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <RoleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name} {user.lastName}
                              </span>
                              {user.phone1 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">{user.phone1}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                            <RoleIcon className="w-3 h-3" />
                            {getRoleLabel(user.role)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {team?.name || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              user.isActive
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                            }`}
                          >
                            {user.isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleToggleActive(user.id, user.isActive)}
                              className={`p-2 rounded-lg ${
                                user.isActive
                                  ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900'
                                  : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900'
                              }`}
                              title={user.isActive ? 'Desativar' : 'Ativar'}
                            >
                              {user.isActive ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                <Unlock className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleResetPassword(user.id)}
                              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                              title="Resetar Senha"
                            >
                              <Key className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(user)}
                              className="p-2 rounded-lg text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary-600" />
            Configurações de Identidade
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase">
                Nome do Sistema
              </label>
              <input
                type="text"
                value={sysName}
                onChange={(e) => setSysName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Gestão Igreja Admac"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase">
                Slogan / Descrição Curta
              </label>
              <input
                type="text"
                value={sysShortName}
                onChange={(e) => setSysShortName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Sistema de Gestão Inteligente"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase">
                  URL do Logo
                </label>
                <input
                  type="url"
                  value={sysLogo}
                  onChange={(e) => setSysLogo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="https://..."
                />
                {sysLogo && (
                  <div className="mt-2 p-2 border rounded-lg bg-gray-50 flex items-center justify-center">
                    <img src={sysLogo} alt="Preview Logo" className="h-12 object-contain" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase">
                  URL do Favicon
                </label>
                <input
                  type="url"
                  value={sysFavicon}
                  onChange={(e) => setSysFavicon(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="https://..."
                />
                {sysFavicon && (
                  <div className="mt-2 p-2 border rounded-lg bg-gray-50 flex items-center justify-center">
                    <img src={sysFavicon} alt="Preview Favicon" className="w-8 h-8 object-contain" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button
              onClick={() => {
                updateSystemConfig({
                  systemName: sysName,
                  systemShortName: sysShortName,
                  logoUrl: sysLogo,
                  faviconUrl: sysFavicon
                })
                showToast('Configurações salvas com sucesso!', 'success')
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-8 rounded-lg shadow-lg shadow-primary-500/30 transition-all active:scale-95"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <UserModal user={editingUser} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default Admin
