import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { User } from '../types'
import { 
  Users, 
  Search, 
  Plus, 
  UserCircle, 
  Cake, 
  Contact, 
  Phone,
  Filter,
  Edit,
  Trash2
} from 'lucide-react'
import UserModal from '../components/UserModal'

const Members = () => {
  const { users, deleteUser } = useFinance()
  const { hasPermission } = useAuth()
  const { showToast } = useToast()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'list' | 'birthdays' | 'cards'>('list')

  const canEdit = hasPermission('manage_users')

  const filteredMembers = users.filter((user: User) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const birthdaysThisMonth = users.filter((user: User) => {
    if (!user.birthDate) return false
    const birthMonth = new Date(user.birthDate).getMonth()
    const currentMonth = new Date().getMonth()
    return birthMonth === currentMonth
  }).sort((a, b) => {
    const dayA = new Date(a.birthDate!).getDate()
    const dayB = new Date(b.birthDate!).getDate()
    return dayA - dayB
  })

  const handleEdit = (member: User) => {
    setEditingMember(member)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Excluir este membro permanentemente?')) {
      deleteUser(id)
      showToast('Membro excluído', 'success')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pessoas</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Gestão de membros e congregados</p>
        </div>
        {canEdit && (
          <button 
            onClick={() => { setEditingMember(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-5 h-5" />
            Adicionar Pessoa
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'list' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Lista de Membros
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('birthdays')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'birthdays' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <div className="flex items-center gap-2">
            <Cake className="w-4 h-4" />
            Aniversariantes
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('cards')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'cards' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <div className="flex items-center gap-2">
            <Contact className="w-4 h-4" />
            Cartões
          </div>
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar por nome ou email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
              />
            </div>
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2 text-gray-600 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {/* Members List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <div key={member.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-6 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary-100 group-hover:border-primary-500 transition-colors">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                        <UserCircle className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  {canEdit && (
                    <button 
                      onClick={() => handleEdit(member)}
                      className="absolute bottom-4 right-0 bg-primary-600 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {member.name} {member.lastName}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{member.email}</p>
                
                <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone1 || 'S/ Tel'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Cake className="w-4 h-4" />
                    <span>{member.birthDate ? new Date(member.birthDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : 'S/ Data'}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 w-full">
                  <button 
                    onClick={() => handleEdit(member)}
                    className="flex-1 text-xs py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 rounded-lg text-gray-600 dark:text-gray-300 font-medium"
                  >
                    Ver Perfil
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'birthdays' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-primary-50/50 dark:bg-primary-900/20">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Cake className="w-5 h-5 text-pink-500" />
              Aniversariantes do Mês ({new Date().toLocaleDateString('pt-BR', { month: 'long' })})
            </h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {birthdaysThisMonth.length > 0 ? (
              birthdaysThisMonth.map(member => (
                <div key={member.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                      {member.imageUrl ? (
                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <UserCircle className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{member.name} {member.lastName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(member.birthDate!).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-center bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 px-3 py-1 rounded-full text-xs font-bold">
                    Dia {new Date(member.birthDate!).getDate()}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">Nenhum aniversariante encontrado este mês.</div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMembers.slice(0, 6).map(member => (
            <div key={member.id} className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white shadow-2xl overflow-hidden group">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black italic tracking-tighter">ADMAC</h2>
                    <p className="text-[10px] uppercase opacity-80 tracking-widest font-bold">Igreja Evangélica</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 px-3 py-1 rounded text-[10px] font-bold uppercase">Membro Oficial</div>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-lg bg-white p-1 shadow-inner">
                    <div className="w-full h-full rounded bg-gray-200 overflow-hidden">
                      {member.imageUrl ? (
                        <img src={member.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle className="w-full h-full text-gray-400 p-2" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase opacity-70 mb-1 font-bold">Nome Completo</p>
                    <h3 className="text-xl font-bold uppercase truncate">{member.name} {member.lastName}</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[8px] uppercase opacity-70 font-bold">Cargo</p>
                        <p className="text-xs font-semibold">{member.role === 'admin' ? 'Administrador' : member.role === 'leader' ? 'Líder' : 'Membro'}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase opacity-70 font-bold">Desde</p>
                        <p className="text-xs font-semibold">{new Date(member.createdAt).getFullYear()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-baseline border-t border-white/20 pt-4">
                  <p className="text-[8px] opacity-70">SANTIDADE AO SENHOR</p>
                  <div className="flex gap-2 text-[10px] font-mono">
                    <span>{member.id.substring(0, 8).toUpperCase()}</span>
                    <span className="opacity-50">|</span>
                    <span>{new Date(member.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="md:col-span-2 text-center py-6">
            <p className="text-sm text-gray-500 italic mb-4">A visualização acima é um modelo para impressão dos cartões de membros.</p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all hover:scale-105">
              Gerar Todos para Impressão (PDF)
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <UserModal user={editingMember} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default Members
