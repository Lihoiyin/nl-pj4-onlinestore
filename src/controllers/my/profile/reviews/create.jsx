import { getSession } from 'next-auth/react'
import { schema } from '@/controllers/my/profile/reviews/_schemas'
import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyReviewsCreate = async (req, res) => {
  try {
    const session = await getSession({ req })
    const verifiedData = await schema.validate(req.body, { abortEarly: false, stripUnknown: true })
    const review = await prisma.review.create({
      data: {
        ...verifiedData,
        profileId: Number(session.user.profile.id)

      }
    })

    return res.status(201).json(review)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyReviewsCreate)
