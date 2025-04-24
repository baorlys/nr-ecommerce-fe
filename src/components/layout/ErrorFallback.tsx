// src/components/ErrorFallback.tsx
import { FallbackProps } from 'react-error-boundary'

export default function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="mx-auto mt-10 max-w-md rounded-xl border border-red-400 bg-red-100 p-6 text-red-800 shadow-md"
    >
      <h2 className="mb-2 text-lg font-semibold">Oops! Something went wrong.</h2>
      <p className="mb-4">Please try again later.</p>
      <button
        className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  )
}
