import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyItemsDelete = async (req, res) => {
  try {
    const { query: { itemId } } = req
    const deletedItem = await prisma.item.delete({
      where: {
        id: Number(itemId)
      }
    })
    return res.status(200).json(deletedItem)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyItemsDelete)
