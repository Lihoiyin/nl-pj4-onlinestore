import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyReviewsDelete = async (req, res) => {
  try {
    const review = await prisma.review.delete({
      where: {
        id: req.body.id
      }
    })

    return res.status(201).json(review)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyReviewsDelete)
