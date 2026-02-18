import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Church, Lock, Mail } from 'lucide-react'
import UserModal from '../components/UserModal'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, systemConfig } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [showRegister, setShowRegister] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log('Tentativa de login:', { email, password })
    setLoading(true)

    try {
      const success = await login(email, password)
      console.log('Resultado do login:', success)
      
      if (success) {
        showToast('Login realizado com sucesso!', 'success')
        // Pequeno delay para garantir que o estado foi atualizado
        setTimeout(() => {
          navigate('/dashboard')
        }, 100)
      } else {
        showToast('Email ou senha incorretos', 'error')
      }
    } catch (error) {
      console.error('Erro no handleSubmit:', error)
      showToast('Erro ao fazer login. Tente novamente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4 overflow-hidden shadow-inner">
              {systemConfig.logoUrl ? (
                <img src={systemConfig.logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
              ) : (
                <Church className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {systemConfig.systemName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {systemConfig.systemShortName}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
                >
                  Cadastrar agora
                </button>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Credenciais de teste:
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>
                <strong>Admin:</strong> admin@igreja.com / admin123
              </p>
              <p>
                <strong>Líder:</strong> lider@igreja.com / lider123
              </p>
              <p>
                <strong>Visualizador:</strong> viewer@igreja.com / viewer123
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {showRegister && (
        <UserModal onClose={() => setShowRegister(false)} isRegistration />
      )}
    </div>
  )
}

export default Login

