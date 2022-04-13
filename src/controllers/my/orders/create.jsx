import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { schema } from '@/controllers/my/orders/_schemas'

const controllersApiProfileCreate = async (req, res) => {
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
          create: {
            quantity: verifiedData.itemOnOrders.quantity,
            subtotal: verifiedData.itemOnOrders.subtotal,
            item: {
              connect: { id: verifiedData.itemOnOrders.itemId }
            }
          }
        },
        shopOnOrders: {
          create: { shopId: verifiedData.shop.shopId }
        }
      }
    })

    return res.status(201).json(newOrder)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiProfileCreate)
