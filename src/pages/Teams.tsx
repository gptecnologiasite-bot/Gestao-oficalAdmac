import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Plus, Edit, Trash2, Users, DollarSign } from 'lucide-react'
import TeamModal from '../components/TeamModal'

const Teams = () => {
  const { teams, users, transactions, deleteTeam } = useFinance()
  const { hasPermission } = useAuth()
  const { showToast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [editingTeam, setEditingTeam] = useState<any>(null)

  const canEdit = hasPermission('manage_teams')

  const getTeamStats = (teamId: string) => {
    const teamTransactions = transactions.filter((t) => t.teamId === teamId)
    const income = teamTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = teamTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return {
      income,
      expense,
      balance: income - expense,
      transactionCount: teamTransactions.length,
    }
  }

  const handleEdit = (team: any) => {
    setEditingTeam(team)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta equipe?')) {
      deleteTeam(id)
      showToast('Equipe excluída com sucesso!', 'success')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTeam(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Equipes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gerencie equipes e departamentos
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nova Equipe
          </button>
        )}
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => {
          const leader = users.find((u) => u.id === team.leaderId)
          const stats = getTeamStats(team.id)
          const teamMembers = users.filter((u) => u.teamId === team.id)

          return (
            <div
              key={team.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            >
              {team.imageUrl && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={team.imageUrl}
                    alt={team.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {team.name}
                  </h3>
                  {team.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {team.description}
                    </p>
                  )}
                </div>
                {canEdit && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(team)}
                      className="text-primary-600 hover:text-primary-900 dark:text-primary-400"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>
                    {teamMembers.length} membro{teamMembers.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {leader && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Líder:</strong> {leader.name}
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Resumo Financeiro
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Receitas</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        R$ {stats.income.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Despesas</p>
                      <p className="font-semibold text-red-600 dark:text-red-400">
                        R$ {stats.expense.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Saldo</p>
                      <p
                        className={`font-semibold ${
                          stats.balance >= 0
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        R$ {stats.balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {stats.transactionCount} transação{stats.transactionCount !== 1 ? 'ões' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      </div>

      {teams.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Nenhuma equipe cadastrada ainda
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TeamModal team={editingTeam} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default Teams

