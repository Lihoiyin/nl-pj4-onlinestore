import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import { getSession } from 'next-auth/react'

const controllersMyItemsIndex = async (req, res) => {
  try {
    const session = await getSession({ req })
    const foundItems = await prisma.item.findMany({
      where: {
        shopId: Number(session.user.shopId)
      }
    })
    return res.status(200).json(foundItems)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersMyItemsIndex)
