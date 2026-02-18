import { ToastType } from '../context/ToastContext'
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: ToastType
}

const Toast = ({ message, type }: ToastProps) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
  }

  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
  }

  const Icon = icons[type]

  return (
    <div
      className={`${colors[type]} px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[300px] animate-slide-in`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
    </div>
  )
}

export default Toast

