import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

import { schema } from '@/controllers/my/profile/orders/_schemas'

const controllersMyOrdersCreate = async (req, res) => {
  try {
    const { body } = req
    const session = await getSession({ req })
    const verifiedData = await schema.validate(body, { abortEarly: false, stripUnknown: true })
    const newOrder = await prisma.order.create({
      data: {
        totalPrice: verifiedData.totalPrice,
        address: verifiedData.address,
        profile:
        {
          connect: {
            id: session.user.profile.id
          }
        },
        itemOnOrders: {
          create: body.itemOnOrders.map((itemOnOrder) => ({
            quantity: Number(itemOnOrder.quantity),
            subtotal: Number(itemOnOrder.subtotal),
            item: {
              connect: {
                id: Number(itemOnOrder.itemId)
              }
            }
          }))
        },
        shopOnOrders: {
          create: body.shops.map((shop) => ({ shopId: Number(shop.shopId) })) || []
        }
      },
      include: {
        itemOnOrders: true,
        shopOnOrders: true
      }
    })
    return res.status(201).json(newOrder)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyOrdersCreate)
