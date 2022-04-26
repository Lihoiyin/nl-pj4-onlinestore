import nc from '@/controllers/_helpers/nc'
import controllersMyShopCreate from '@/controllers/my/shop/create'

export default nc()
  .post(controllersMyShopCreate)

export const config = {
  api: {
    bodyParser: false
  }
}
