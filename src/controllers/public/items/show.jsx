import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersPublicItemsShow = async (req, res) => {
  try {
    const { query: { itemId } } = req
    const foundItem = await prisma.item.findUnique({
      where: {
        id: Number(itemId)
      }
    })
    return res.status(200).json(foundItem)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersPublicItemsShow)