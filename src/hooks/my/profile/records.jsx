import axios from 'axios'
import { handleErrors } from '@/hooks/_utils'

export default function useMyProfileRecord() {
  const createMyProfileRecord = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/profile/reviews',
      data: values
    }).then(() => {
    }).catch(handleErrors)
  }

  return {
    createMyProfileRecord
  }
}
