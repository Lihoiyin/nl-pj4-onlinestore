import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import authenticateProfile from '@/controllers/_middlewares/authenticateProfile'

const controllersMyOrdersIndex = async (req, res) => {
  try {
    const session = await getSession({ req })
    const foundOrders = await prisma.order.findMany({
      where: {
        profileId: Number(session.user.profile.id)
      }
    })
    return res.status(200).json(foundOrders)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(authenticateProfile)
  .use(controllersMyOrdersIndex)
