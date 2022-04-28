import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyItemsShow = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { query: { itemId } } = req
    const foundItem = await prisma.item.findFirst({
      where: {
        id: Number(itemId),
        shopId: Number(session.user.shop.id)
      }
    })
    return res.status(200).json(foundItem)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyItemsShow)
