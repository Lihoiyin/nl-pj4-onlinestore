import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import prisma from '@/controllers/_helpers/prisma'

const controllersOrdersIndex = async (req, res) => {
  try {
    const foundOrders = await prisma.order.findMany({
    })
    return res.status(200).json(foundOrders)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersOrdersIndex)
