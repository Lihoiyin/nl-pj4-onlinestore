import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import { getSession } from 'next-auth/react'

const controllersApiMyItemsShow = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { query: { itemId } } = req
    const foundItem = await prisma.item.findFirst({
      where: {
        id: Number(itemId),
        shopId: Number(session.user.shopId)
      }
    })
    return res.status(200).json(foundItem)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiMyItemsShow)
