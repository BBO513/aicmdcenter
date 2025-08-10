
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, {})
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userId = session.user.id

    // Get dashboard statistics
    const [
      totalProducts,
      publishedProducts,
      totalRevenue,
      recentRevenue,
      agentLogs,
      recentProducts
    ] = await Promise.all([
      prisma.product.count({ where: { userId } }),
      prisma.product.count({ where: { userId, status: 'published' } }),
      prisma.product.findMany({
        where: { userId },
        include: {
          revenues: true
        }
      }).then(products => 
        products.reduce((total, product) => 
          total + product.revenues.reduce((sum, rev) => sum + rev.amount, 0), 0)
      ),
      prisma.product.findMany({
        where: { 
          userId,
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        },
        include: { revenues: true }
      }).then(products => 
        products.reduce((total, product) => 
          total + product.revenues.reduce((sum, rev) => sum + rev.amount, 0), 0)
      ),
      prisma.agentLog.findMany({
        where: {
          product: { userId }
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { product: true }
      }),
      prisma.product.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          revenues: true,
          agentLogs: { take: 1, orderBy: { createdAt: 'desc' } }
        }
      })
    ])

    // Agent performance stats
    const agentStats = {
      market_research: agentLogs.filter(log => log.agentName === 'market_research'),
      content_creation: agentLogs.filter(log => log.agentName === 'content_creation'),
      platform_management: agentLogs.filter(log => log.agentName === 'platform_management')
    }

    const stats = {
      products: {
        total: totalProducts,
        published: publishedProducts,
        draft: totalProducts - publishedProducts
      },
      revenue: {
        total: totalRevenue,
        thisMonth: recentRevenue,
        growth: recentRevenue > 0 ? ((recentRevenue / (totalRevenue || 1)) * 100) : 0
      },
      agents: {
        total: Object.keys(agentStats).length,
        active: Object.values(agentStats).filter(logs => 
          logs.some(log => log.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000))
        ).length,
        successRate: agentLogs.length > 0 
          ? (agentLogs.filter(log => log.status === 'completed').length / agentLogs.length * 100)
          : 0
      },
      recentProducts,
      recentLogs: agentLogs.slice(0, 5)
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Dashboard Stats Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
