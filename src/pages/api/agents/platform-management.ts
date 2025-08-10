
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { PlatformManagementAgent } from '@/lib/agents/platform-management'
import { getErrorMessage } from '@/utils/error-handler'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, {})
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'POST') {
      const { action, data, productId } = req.body
      
      const agentLog = await prisma.agentLog.create({
        data: {
          agentName: 'platform_management',
          action,
          status: 'running',
          data: data || {},
          productId
        }
      })

      try {
        const agent = new PlatformManagementAgent()
        const result = await agent.execute(action, data)
        
        await prisma.agentLog.update({
          where: { id: agentLog.id },
          data: { 
            status: 'completed',
            data: result
          }
        })

        res.status(200).json({ success: true, result, logId: agentLog.id })
      } catch (error) {
        await prisma.agentLog.update({
          where: { id: agentLog.id },
          data: { 
            status: 'failed',
            data: { error: getErrorMessage(error) }
          }
        })
        throw error
      }
    } else if (req.method === 'GET') {
      const logs = await prisma.agentLog.findMany({
        where: { agentName: 'platform_management' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { product: true }
      })
      res.status(200).json({ logs })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Platform Management Agent Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
