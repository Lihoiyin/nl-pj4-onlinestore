import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyRecordItemsCreate = async (req, res) => {
  try {
    const session = await getSession({ req })

    const record = await prisma.profile.update({
      where: {
        profileId: session.user.profile.id
      },
      data: {
        record: {
          items: {
            connect: [
              req.body.itemIds.map((itemId) => ({ id: itemId }))
            ]
          }
        }
      }
    })

    return res.status(201).json(record)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyRecordItemsCreate)
