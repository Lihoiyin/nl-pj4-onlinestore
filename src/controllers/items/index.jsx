import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'

const controllersItemsIndex = async (req, res) => {
  try {
    // Filters
    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    // Pagination
    const take = 40
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      title: {
        contains: q
      }
    }

    const totalItems = await prisma.Item.count({ where })
    const foundItems = await prisma.Item.findMany({
      take,
      skip,
      where,
      orderBy: {
        [orderBy]: sortBy
      }
    })

    return res.status(200).json({
      Items: foundItems,
      meta: { currentPage: page, totalPages: Math.ceil(totalItems / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersItemsIndex)
