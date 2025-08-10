
interface StatsOverviewProps {
  stats: any
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Products',
      value: stats.products?.total || 0,
      change: `+${stats.products?.published || 0} published`,
      changeType: 'positive',
      icon: '📦'
    },
    {
      name: 'Total Revenue',
      value: `$${stats.revenue?.total?.toFixed(2) || '0.00'}`,
      change: `+${stats.revenue?.growth?.toFixed(1) || 0}% this month`,
      changeType: stats.revenue?.growth > 0 ? 'positive' : 'neutral',
      icon: '💰'
    },
    {
      name: 'Active Agents',
      value: stats.agents?.active || 0,
      change: `${stats.agents?.successRate?.toFixed(1) || 0}% success rate`,
      changeType: stats.agents?.successRate > 80 ? 'positive' : 'warning',
      icon: '🤖'
    },
    {
      name: 'This Month',
      value: `$${stats.revenue?.thisMonth?.toFixed(2) || '0.00'}`,
      change: `${stats.products?.published || 0} products live`,
      changeType: 'positive',
      icon: '📈'
    }
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">System Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <span className={`text-xs font-medium ${
                    item.changeType === 'positive' 
                      ? 'text-green-600' 
                      : item.changeType === 'warning' 
                      ? 'text-yellow-600' 
                      : 'text-gray-600'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
