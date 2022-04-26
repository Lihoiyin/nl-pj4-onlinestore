import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersPublicShopsIndex = async (req, res) => {
  try {
    const foundShops = await prisma.shop.findMany()
    return res.status(200).json(foundShops)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersPublicShopsIndex)
