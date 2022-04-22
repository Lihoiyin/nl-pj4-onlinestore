import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import { getSession } from 'next-auth/react'

const controllersApiMyItemsIndex = async (req, res) => {
  const session = await getSession({ req })
  try {
    const foundItems = await prisma.Item.findMany({
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
  .use(controllersApiMyItemsIndex)
