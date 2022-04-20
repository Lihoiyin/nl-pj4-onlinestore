import nc from '@/controllers/_helpers/nc'
import controllersApiMyProfileCreate from '@/controllers/my/self/profile/create'

export default nc()
  .post(controllersApiMyProfileCreate)
