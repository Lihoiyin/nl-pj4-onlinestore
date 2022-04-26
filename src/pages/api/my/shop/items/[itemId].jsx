import nc from '@/controllers/_helpers/nc'
import controllersMyItemsShow from '@/controllers/my/shop/items/show'
import controllersMyItemsUpdate from '@/controllers/my/shop/items/update'
import controllersMyItemsDelete from '@/controllers/my/shop/items/delete'

export default nc()
  .get(controllersMyItemsShow)
  .put(controllersMyItemsUpdate)
  .delete(controllersMyItemsDelete)
