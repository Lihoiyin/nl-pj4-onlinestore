import nc from '@/controllers/_helpers/nc'
import controllersApiMyShopOrdersShow from '@/controllers/my/shop/orders/show'
import controllersApiMyShopOrdersUpdate from '@/controllers/my/shop/orders/update'

export default nc()
  .get(controllersApiMyShopOrdersShow)
  .put(controllersApiMyShopOrdersUpdate)
