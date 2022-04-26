import nc from '@/controllers/_helpers/nc'
import controllersApiMyOrdersCreate from '@/controllers/my/orders/create'
import controllersApiMyOrdersIndex from '@/controllers/my/orders/index'

export default nc()
  .get(controllersApiMyOrdersIndex)
  .post(controllersApiMyOrdersCreate)
