import { getSession } from 'next-auth/react'

import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'

const checkOwnership = async (req, res, next) => {
  try {
    const session = getSession({ req })
    const { query: { orderId } } = req
    await prisma.order.findFirst({
      where: {
        id: Number(orderId),
        profileId: session.user.profile.id
      }
    })

    return next()
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default checkOwnership
