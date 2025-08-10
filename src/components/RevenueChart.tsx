
import { useEffect, useRef } from 'react'

interface RevenueChartProps {
  data: any
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for demonstration
    const mockData = [
      { month: 'Jan', revenue: 150 },
      { month: 'Feb', revenue: 280 },
      { month: 'Mar', revenue: 420 },
      { month: 'Apr', revenue: 380 },
      { month: 'May', revenue: 650 },
      { month: 'Jun', revenue: 890 }
    ]

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - 2 * padding
    const chartHeight = canvas.height - 2 * padding

    // Find max value for scaling
    const maxRevenue = Math.max(...mockData.map(d => d.revenue))
    
    // Draw axes
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    
    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.stroke()
    
    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Draw data line
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.beginPath()

    mockData.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (mockData.length - 1)
      const y = canvas.height - padding - (point.revenue / maxRevenue) * chartHeight
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = '#3b82f6'
    mockData.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (mockData.length - 1)
      const y = canvas.height - padding - (point.revenue / maxRevenue) * chartHeight
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw labels
    ctx.fillStyle = '#6b7280'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    
    mockData.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (mockData.length - 1)
      ctx.fillText(point.month, x, canvas.height - padding + 20)
    })

  }, [data])

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Revenue Trend
        </h3>
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-auto"
          />
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500">
            Total Revenue: ${data?.total?.toFixed(2) || '0.00'}
          </div>
          <div className="text-sm text-gray-500">
            This Month: ${data?.thisMonth?.toFixed(2) || '0.00'}
          </div>
        </div>
      </div>
    </div>
  )
}
