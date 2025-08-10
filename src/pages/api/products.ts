
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

    if (req.method === 'GET') {
      const products = await prisma.product.findMany({
        where: { userId },
        include: {
          revenues: true,
          agentLogs: {
            orderBy: { createdAt: 'desc' },
            take: 3
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json({ products })
    } else if (req.method === 'POST') {
      const { title, description, category, price, platforms } = req.body
      
      const product = await prisma.product.create({
        data: {
          title,
          description,
          category,
          price: parseFloat(price),
          platforms: platforms || [],
          userId,
          status: 'draft'
        }
      })
      
      res.status(201).json({ product })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Products API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
