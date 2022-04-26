import nc from '@/controllers/_helpers/nc'

import controllersMyOrdersShow from '@/controllers/my/profile/orders/show'
import controllersMyOrdersDelete from '@/controllers/my/profile/orders/delete'

export default nc()
  .get(controllersMyOrdersShow)
  .delete(controllersMyOrdersDelete)
