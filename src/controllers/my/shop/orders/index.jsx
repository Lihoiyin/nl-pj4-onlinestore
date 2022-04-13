import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersShopOrdersIndex = async (req, res) => {
  try {
    const foundOrders = await prisma.order.findMany({
      where: {
        shopOnOrders: {
          id: { id: req.session.shopId }
        }
      },
      include: {
        itemOnOrders: true
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
  .use(controllersShopOrdersIndex)
