import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyShopOrdersUpdate = async (req, res) => {
  const { query: { orderId }, body } = req
  try {
    const updatedOrders = await prisma.shopOnOrder.update({

      where: {
        id: Number(orderId)
      },
      data: {
        process: body.process
      }
    })
    return res.status(200).json(updatedOrders)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyShopOrdersUpdate)
