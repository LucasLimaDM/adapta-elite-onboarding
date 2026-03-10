import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center space-y-4 animate-fade-in-up">
        <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-slate-900">Página não encontrada</h2>
        <p className="text-lg text-slate-600 pb-4">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="w-full h-12 text-lg">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Voltar para o Início
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
