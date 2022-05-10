import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyLikeListItemsCreate = async (req, res) => {
  try {
    const session = await getSession({ req })

    const likeList = await prisma.profile.update({
      where: {
        profileId: session.user.profile.id
      },
      data: {
        likeList: {
          items: {
            connect: {
              id: req.body.itemId
            }
          }
        }
      }
    })

    return res.status(201).json(likeList)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyLikeListItemsCreate)
