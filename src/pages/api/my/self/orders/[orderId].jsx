import nc from '@/controllers/_helpers/nc'

import controllersApiMyOrdersShow from '@/controllers/my/orders/show'
import controllersApiMyOrdersDelete from '@/controllers/my/orders/delete'

export default nc()
  .get(controllersApiMyOrdersShow)
  .delete(controllersApiMyOrdersDelete)
