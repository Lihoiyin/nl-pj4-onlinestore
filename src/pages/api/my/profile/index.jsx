import nc from '@/controllers/_helpers/nc'
import controllersMyProfileShow from '@/controllers/my/profile/show'
import controllersMyProfileCreate from '@/controllers/my/profile/create'

export default nc()
  .get(controllersMyProfileShow)
  .post(controllersMyProfileCreate)
