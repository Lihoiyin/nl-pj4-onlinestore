import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersMyOrdersIndex = async (req, res) => {
  try {
    const session = await getSession({ req })
    console.log(session)
    const foundOrders = await prisma.order.findMany({
      where: {
        profileId: Number(session.user.profile.id)
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
        shopOnOrders: {
          include: {
            shop: true
          }
        },
        profile: true
      }
    })
    console.log(123, foundOrders)
    return res.status(200).json(foundOrders)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersMyOrdersIndex)
