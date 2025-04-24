import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/layout/ErrorFallback'
import './index.css'
import App from './App'

function logErrorToConsole(error: Error, info: { componentStack?: string | null }) {
  console.error('Error caught by ErrorBoundary:', error)
  console.error('Component stack:', info.componentStack ?? 'No stack trace available')
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logErrorToConsole}>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
