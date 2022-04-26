import nc from '@/controllers/_helpers/nc'
import controllersMyOrdersCreate from '@/controllers/my/profile/orders/create'
import controllersMyOrdersIndex from '@/controllers/my/profile/orders/index'

export default nc()
  .get(controllersMyOrdersIndex)
  .post(controllersMyOrdersCreate)
