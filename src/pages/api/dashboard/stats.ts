
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, {})
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Return demo data for MVP
    const stats = {
      products: {
        total: 12,
        published: 8,
        draft: 4
      },
      revenue: {
        total: 2450.00,
        thisMonth: 890.00,
        growth: 15.2
      },
      agents: {
        total: 3,
        active: 2,
        successRate: 87.5
      },
      recentProducts: [
        {
          id: '1',
          title: 'Digital Art Collection',
          status: 'published',
          createdAt: new Date(),
          revenues: [{ amount: 150 }],
          agentLogs: [{ status: 'completed', createdAt: new Date() }]
        },
        {
          id: '2', 
          title: 'Photography Bundle',
          status: 'draft',
          createdAt: new Date(),
          revenues: [{ amount: 0 }],
          agentLogs: [{ status: 'running', createdAt: new Date() }]
        }
      ],
      recentLogs: [
        {
          id: '1',
          agentName: 'market_research',
          status: 'completed',
          createdAt: new Date(),
          product: { title: 'Digital Art Collection' }
        },
        {
          id: '2',
          agentName: 'content_creation', 
          status: 'running',
          createdAt: new Date(),
          product: { title: 'Photography Bundle' }
        }
      ]
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Dashboard Stats Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
