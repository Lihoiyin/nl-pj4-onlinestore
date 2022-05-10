import nc from '@/controllers/_helpers/nc'
import controllersPublicItemsIndex from '@/controllers/public/items/index'
import controllersPublicItemsDeleteMany from '@/controllers/public/items/deleteAll'

export default nc()
  .get(controllersPublicItemsIndex)
  .delete(controllersPublicItemsDeleteMany)
