import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersApiMyOrdersDelete = async (req, res) => {
  try {
    const { query: { orderId } } = req
    const deletedOrder = await prisma.order.delete({
      where: {
        id: Number(orderId)
      }
    })
    return res.status(200).json(deletedOrder)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiMyOrdersDelete)
