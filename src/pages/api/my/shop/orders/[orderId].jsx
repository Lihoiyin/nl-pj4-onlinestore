import nc from '@/controllers/_helpers/nc'
import controllersMyShopOrdersShow from '@/controllers/my/shop/orders/show'
import controllersMyShopOrdersUpdate from '@/controllers/my/shop/orders/update'

export default nc()
  .get(controllersMyShopOrdersShow)
  .put(controllersMyShopOrdersUpdate)
