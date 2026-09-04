'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function currentUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createPersistentOrder(input: { productId: string; productName: string; amount: number; paymentMethod?: string }) {
  const userId = await currentUserId()
  const id = `VX-${Math.floor(10000 + Math.random() * 90000)}`
  await db.insert(orders).values({ id, userId, productId: input.productId, productName: input.productName, amount: input.amount.toFixed(2), status: 'pending', paymentMethod: input.paymentMethod ?? 'orange_money' })
  revalidatePath('/dashboard')
  return id
}

export async function getMyPersistentOrders() {
  const userId = await currentUserId()
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt))
}
