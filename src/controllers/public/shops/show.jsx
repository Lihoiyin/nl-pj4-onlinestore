import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersPublicShopsShow = async (req, res) => {
  try {
    const { query: { shopId } } = req
    const foundShop = await prisma.shop.findFirst({
      where: {
        id: Number(shopId)
      }
    })
    return res.status(200).json(foundShop)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersPublicShopsShow)
