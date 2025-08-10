
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Navbar from '@/components/Navbar'
import AgentCard from '@/components/AgentCard'
import PipelineTable from '@/components/PipelineTable'
import RevenueChart from '@/components/RevenueChart'
import StatsOverview from '@/components/StatsOverview'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('overview')

  const { data: stats, error: statsError } = useSWR(
    session ? '/api/dashboard/stats' : null,
    fetcher,
    { refreshInterval: 30000 }
  )

  const { data: products, error: productsError } = useSWR(
    session ? '/api/products' : null,
    fetcher,
    { refreshInterval: 10000 }
  )

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              AI Command Center
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to access your digital product sales system
            </p>
          </div>
          <div>
            <button
              onClick={() => signIn()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session.user} onSignOut={() => signOut()} />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {['overview', 'agents', 'products', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <StatsOverview stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart data={stats?.revenue} />
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  {stats?.recentLogs ? (
                    <div className="space-y-3">
                      {stats.recentLogs.map((log: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              log.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : log.status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {log.status}
                            </span>
                            <span className="ml-3 text-sm text-gray-900">
                              {log.agentName.replace('_', ' ')} - {log.action}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(log.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AgentCard
              name="Market Research"
              description="Analyzes trends and identifies profitable niches"
              status="active"
              lastRun={stats?.recentLogs?.find((log: any) => log.agentName === 'market_research')?.createdAt}
              actions={[
                { name: 'Analyze Trends', action: 'analyze-trends' },
                { name: 'Find Niches', action: 'find-niches' },
                { name: 'Competitor Analysis', action: 'competitor-analysis' }
              ]}
              endpoint="/api/agents/market-research"
            />
            <AgentCard
              name="Content Creation"
              description="Generates digital products using AI"
              status="active"
              lastRun={stats?.recentLogs?.find((log: any) => log.agentName === 'content_creation')?.createdAt}
              actions={[
                { name: 'Generate Template', action: 'generate-template' },
                { name: 'Create Guide', action: 'create-guide' },
                { name: 'Design Graphics', action: 'design-graphics' }
              ]}
              endpoint="/api/agents/content-creation"
            />
            <AgentCard
              name="Platform Management"
              description="Handles listing and optimization across platforms"
              status="active"
              lastRun={stats?.recentLogs?.find((log: any) => log.agentName === 'platform_management')?.createdAt}
              actions={[
                { name: 'List Product', action: 'list-product' },
                { name: 'Optimize Listings', action: 'optimize-listings' },
                { name: 'Update Pricing', action: 'update-pricing' }
              ]}
              endpoint="/api/agents/platform-management"
            />
          </div>
        )}

        {activeTab === 'products' && (
          <PipelineTable products={products?.products || []} />
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Analytics Dashboard
              </h3>
              <p className="text-gray-500">
                Detailed analytics coming in Phase 2...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
