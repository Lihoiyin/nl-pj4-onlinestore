import axios from 'axios'

import { handleErrors } from '@/hooks/_utils'

export default function useMyProfile() {
  const createProfile = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/self/profile',
      data: values
    }).then(() => {

    }).catch(handleErrors)
  }

  return {
    createProfile
  }
}
