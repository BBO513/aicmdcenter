
import { useState } from 'react'
import { getErrorMessage } from '@/utils/error-handler'

interface AgentCardProps {
  name: string
  description: string
  status: 'active' | 'inactive' | 'error'
  lastRun?: string
  actions: Array<{ name: string; action: string }>
  endpoint: string
}

export default function AgentCard({
  name,
  description,
  status,
  lastRun,
  actions,
  endpoint
}: AgentCardProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)

  const executeAction = async (action: string) => {
    setIsRunning(true)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, data: {} }),
      })
      
      const result = await response.json()
      setLastResult(result)
      
      if (!result.success) {
        throw new Error(result.error || 'Action failed')
      }
    } catch (error) {
      setLastResult({ error: getErrorMessage(error) })
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {name}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {status}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          {description}
        </p>
        
        {lastRun && (
          <p className="text-xs text-gray-400 mb-4">
            Last run: {new Date(lastRun).toLocaleString()}
          </p>
        )}

        <div className="space-y-2">
          {actions.map((actionItem, index) => (
            <button
              key={index}
              onClick={() => executeAction(actionItem.action)}
              disabled={isRunning}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
            >
              {isRunning ? 'Running...' : actionItem.name}
            </button>
          ))}
        </div>

        {lastResult && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Last Result:</h4>
            <pre className="text-xs text-gray-600 overflow-x-auto">
              {JSON.stringify(lastResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
