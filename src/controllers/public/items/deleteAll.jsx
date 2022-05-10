import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'

const controllersPublicItemsDeleteMany = async (req, res) => {
  try {
    const foundItems = await prisma.item.deleteMany({})

    return res.status(200).json(foundItems)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersPublicItemsDeleteMany)
