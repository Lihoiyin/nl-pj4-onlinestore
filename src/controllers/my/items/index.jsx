import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersItemsIndex = async (req, res) => {
  try {
    const foundItems = await prisma.Item.findMany({
      where: {
        shopId: Number(req.session.shopId)
      }
    })
    return res.status(200).json(foundItems)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersItemsIndex)
