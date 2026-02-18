import { useState, useEffect, FormEvent } from 'react'
import { useFinance } from '../context/FinanceContext'
import { useToast } from '../context/ToastContext'
import { X } from 'lucide-react'
import { User, UserRole } from '../types'

interface UserModalProps {
  user?: User | null
  onClose: () => void
  isRegistration?: boolean
}

const UserModal = ({ user, onClose, isRegistration }: UserModalProps) => {
  const { addUser, updateUser, teams } = useFinance()
  const { showToast } = useToast()

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('viewer')
  const [teamId, setTeamId] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<'Masculino' | 'Feminino'>('Masculino')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [address, setAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    zipCode: '',
    city: '',
    state: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setLastName(user.lastName || '')
      setEmail(user.email)
      setPassword('')
      setRole(user.role)
      setTeamId(user.teamId || '')
      setIsActive(user.isActive)
      setImageUrl(user.imageUrl || '')
      setBirthDate(user.birthDate || '')
      setGender(user.gender || 'Masculino')
      setPhone1(user.phone1 || '')
      setPhone2(user.phone2 || '')
      setAddress({
        street: user.address?.street || '',
        number: user.address?.number || '',
        neighborhood: user.address?.neighborhood || '',
        zipCode: user.address?.zipCode || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
      })
    }
  }, [user])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userData: any = {
        name,
        lastName,
        email,
        role,
        teamId: teamId || undefined,
        isActive,
        imageUrl,
        birthDate,
        gender,
        phone1,
        phone2,
        address,
      }

      if (user) {
        if (password) userData.password = password
        updateUser(user.id, userData)
        showToast('Perfil atualizado com sucesso!', 'success')
      } else {
        if (!password) {
          showToast('Senha é obrigatória', 'error')
          setLoading(false)
          return
        }
        userData.password = password
        addUser(userData)
        showToast('Membro cadastrado com sucesso!', 'success')
      }
      onClose()
    } catch (error) {
      showToast('Erro ao salvar', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isRegistration ? 'Criar Conta' : user ? 'Editar Perfil' : 'Novo Membro'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-8">
          {/* Foto e Info Básica */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-primary-500">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sem Foto
                  </div>
                )}
              </div>
              <input
                type="url"
                placeholder="URL da Foto"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="text-xs w-full px-2 py-1 border rounded"
              />
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Nome</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Sobrenome</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={user ? 'Alterar senha...' : 'Definir senha'} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
            </div>
          </div>

          <hr />

          {/* Dados Pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Data de Nascimento</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Gênero</label>
              <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Telefone Principal</label>
              <input type="text" value={phone1} onChange={(e) => setPhone1(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Rua</label>
                <input type="text" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Número</label>
                <input type="text" value={address.number} onChange={(e) => setAddress({...address, number: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Bairro</label>
                <input type="text" value={address.neighborhood} onChange={(e) => setAddress({...address, neighborhood: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Cidade</label>
                <input type="text" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Estado</label>
                <input type="text" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
              </div>
            </div>
          </div>

          <hr />

          {/* Configurações de Sistema/Igreja - Hidden on registration */}
          {!isRegistration && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Função no Sistema</label>
                <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                  <option value="viewer">Visualizador</option>
                  <option value="leader">Líder</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Equipe/Ministério</label>
                <select value={teamId} onChange={(e) => setTeamId(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                  <option value="">Nenhuma</option>
                  {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 text-primary-600 rounded" />
                <label className="text-sm font-medium">Membro Ativo</label>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white dark:bg-gray-800 py-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300">Cancelar</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-bold shadow-lg shadow-primary-500/30">
              {loading ? 'Salvando...' : isRegistration ? 'Concluir Cadastro' : 'Salvar Cadastro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal

