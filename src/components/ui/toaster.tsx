/* Toaster Component - A component that displays a toaster (a component that displays a toast) - from shadcn/ui (exposes Toaster) */
import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

function ToastIcon({ variant }: { variant?: string }) {
  if (variant === 'destructive') {
    return <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
  }
  if (variant === 'success') {
    return <CheckCircle className="h-5 w-5 text-[#D9B979] shrink-0 mt-0.5" />
  }
  return <Info className="h-5 w-5 text-[#D9B979] shrink-0 mt-0.5" />
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <ToastIcon variant={props.variant} />
            <div className="flex-1 min-w-0">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
