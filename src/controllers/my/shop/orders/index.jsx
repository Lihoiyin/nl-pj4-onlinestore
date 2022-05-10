import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyShopOrdersIndex = async (req, res) => {
  const session = await getSession({ req })
  try {
    const foundOrders = await prisma.order.findMany({
      where: {
        shopOnOrders: {
          id: { id: session.shop.id }
        }
      },
      include: {
        itemOnOrders: {
          include: {
            item: {
              include: {
                shop: true
              }
            }
          }
        },
        shop: true,
        profile: true
      }
    })

    const orders = foundOrders.map((foundOrder) => {
      const { address, id } = foundOrder
      const items = foundOrder.itemOnOrders.filter((itemOnOrder) => itemOnOrder.item.shopId === req.session.shopId)
      const order = { id, address, items }
      return order
    })
    return res.status(200).json(orders)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyShopOrdersIndex)
