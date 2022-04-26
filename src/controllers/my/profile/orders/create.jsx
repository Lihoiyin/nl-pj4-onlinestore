import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { schema } from '@/controllers/my/profile/orders/_schemas'

const controllersMyOrdersCreate = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await schema.validate(body, { abortEarly: false, stripUnknown: true })

    const newOrder = await prisma.order.create({
      data: {
        totalPrice: verifiedData.totalPrice,
        address: verifiedData.address,
        profileId: verifiedData.profileId,
        shopId: verifiedData.shopId,
        itemOnOrders: {
          create: verifiedData.itemOnOrders.map((itemOnOrder) => ({
            quantity: itemOnOrder.quantity,
            subtotal: itemOnOrder.subtotal,
            connect: itemOnOrder.items.map((item) => ({ itemId: Number(item.itemId) })) || []
          })) || []
        },
        shopOnOrders: {
          create: verifiedData.shops.map((shop) => ({ shopId: Number(shop.shopId) })) || []
        }
      }
    })

    return res.status(201).json(newOrder)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersMyOrdersCreate)
