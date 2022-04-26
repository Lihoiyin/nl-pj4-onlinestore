import axios from 'axios'

import { handleErrors, reloadSession } from '@/hooks/_utils'

export default function useMyProfile() {
  const createProfile = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/profile',
      data: values
    }).then(() => {
      reloadSession()
    }).catch(handleErrors)
  }

  return {
    createProfile
  }
}
