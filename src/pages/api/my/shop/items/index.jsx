import nc from '@/controllers/_helpers/nc'
import controllersMyItemsCreate from '@/controllers/my/shop/items/create'
import controllersMyItemsIndex from '@/controllers/my/shop/items/index'

export default nc()
  .get(controllersMyItemsIndex)
  .post(controllersMyItemsCreate)
