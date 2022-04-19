import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersApiMySelfShow = async (req, res) => {
  try {
    const foundUser = await prisma.Item.findUnique({
      where: {
        id: Number(req.session.userId)
      },
      include: {
        shop: true,
        profile: true
      }
    })
    return res.status(200).json(foundUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiMySelfShow)
