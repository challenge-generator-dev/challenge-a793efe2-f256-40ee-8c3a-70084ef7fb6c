import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorMessage from '@/shared/components/ErrorMessage'

const OrderList = lazy(() => import('@/features/orders/OrderList'))

const LoadingSpinner = () => (
  <div className="loading-spinner" role="status" aria-label="Cargando">
    <div className="spinner" />
    <span className="sr-only">Cargando...</span>
  </div>
)

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorMessage}
      onError={(error) => {
        console.error('Error boundary caught:', error)
      }}
    >
      <div className='app-container'>
        <header className='app-header'>
          <h1>Gestión de Órdenes</h1>
        </header>
        <main className='app-main'>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path='/' element={<OrderList />} />
              <Route path='/orders' element={<OrderList />} />
              <Route path='*' element={<ErrorMessage message='Ruta no encontrada' />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App