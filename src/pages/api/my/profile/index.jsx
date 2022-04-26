import nc from '@/controllers/_helpers/nc'
import controllersMyProfileCreate from '@/controllers/my/profile/create'

export default nc()
  .post(controllersMyProfileCreate)
