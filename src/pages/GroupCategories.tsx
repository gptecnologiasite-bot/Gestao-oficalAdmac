import { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { useToast } from '../context/ToastContext'
import { Plus, ChevronRight, X } from 'lucide-react'

const GroupCategories = () => {
  const { groupCategories, addGroupCategory, updateGroupCategory, deleteGroupCategory } = useFinance()
  const { showToast } = useToast()
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      showToast('O nome da categoria é obrigatório', 'error')
      return
    }

    if (editingId) {
      updateGroupCategory(editingId, { name, description })
      showToast('Categoria atualizada com sucesso!', 'success')
      setEditingId(null)
    } else {
      addGroupCategory({ name, description })
      showToast('Categoria criada com sucesso!', 'success')
    }

    setName('')
    setDescription('')
  }

  const handleEdit = (category: any) => {
    setEditingId(category.id)
    setName(category.name)
    setDescription(category.description || '')
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover esta categoria?')) {
      deleteGroupCategory(id)
      showToast('Categoria removida com sucesso!', 'success')
    }
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="text-primary-600 dark:text-primary-400 font-medium">Categorias de grupos</span>
        <ChevronRight className="w-4 h-4" />
        <span>Grupos</span>
        <ChevronRight className="w-4 h-4" />
        <span>Categorias</span>
      </div>

      <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 p-4 rounded-lg">
        <p className="text-sky-800 dark:text-sky-200 text-sm italic">
          Gerencie as categorias de grupos
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table Section */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-bold text-sky-800 dark:text-sky-400">
              Resultados: {groupCategories.length}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3 text-center">Grupos</th>
                  <th className="px-6 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {groupCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 dark:text-gray-200">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="bg-sky-500 hover:bg-sky-600 text-white text-[10px] px-3 py-1 rounded-full transition-colors shadow-sm">
                        Visualizar {category.groupCount} grupos
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="bg-[#0c4a6e] hover:bg-[#075985] text-white text-[10px] px-3 py-1 rounded transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="border border-pink-500 text-pink-500 hover:bg-pink-50 text-[10px] px-3 py-1 rounded transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="bg-emerald-500 p-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingId ? 'Editar categoria' : 'Criar categoria'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">
                  Nome da categoria
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white text-sm resize-none"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#4fd1c5] hover:bg-[#38b2ac] text-white px-8 py-2 rounded-full text-sm font-bold transition-colors shadow-sm"
                >
                  {editingId ? 'Salvar' : 'Criar'}
                </button>
              </div>
              {editingId && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null)
                      setName('')
                      setDescription('')
                    }}
                    className="text-gray-500 text-xs hover:underline"
                  >
                    Cancelar edição
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Ad/Info Box */}
          <div className="bg-[#0284c7] p-6 rounded-lg text-white shadow-sm relative overflow-hidden group">
             <button className="absolute top-2 right-2 text-white/50 hover:text-white">
                <X className="w-4 h-4" />
             </button>
             <h4 className="font-bold text-sm mb-2">Curso de Secretaria para Igrejas</h4>
             <p className="text-xs text-white/80 mb-4 leading-relaxed">
               Organize documentos, agendas e eventos com excelência.
             </p>
             <button className="bg-white text-[#0284c7] px-4 py-1.5 rounded-md text-[10px] font-bold hover:bg-gray-100 transition-colors uppercase">
               Saiba Mais
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupCategories
