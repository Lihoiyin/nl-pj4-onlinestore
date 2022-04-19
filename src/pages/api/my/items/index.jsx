import nc from '@/controllers/_helpers/nc'
import controllersApiMyItemsCreate from '@/controllers/my/items/create'
import controllersApiMyItemsIndex from '@/controllers/my/items/index'

export default nc()
  .get(controllersApiMyItemsIndex)
  .post(controllersApiMyItemsCreate)
