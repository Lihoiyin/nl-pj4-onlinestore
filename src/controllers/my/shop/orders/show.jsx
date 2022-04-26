import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import { getSession } from 'next-auth/react'

const controllersMyShopOrdersShow = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { query: { orderId } } = req
    const foundOrder = await prisma.order.findUnique({
      where: {
        id: Number(orderId)
      },
      include: {
        itemOnOrders: true
      }
    })
    const { address, id } = foundOrder
    const items = foundOrder.itemOnOrders.filter((itemOnOrder) => itemOnOrder.item.shopId === session.user.shopId)
    return res.status(200).json(address, id, items)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersMyShopOrdersShow)
