import axios from 'axios'

import { handleErrors } from '@/hooks/_utils'

export default function useMyShop() {
  const createShop = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/self/shop',
      data: values
    }).then(() => {

    }).catch(handleErrors)
  }

  return {
    createShop
  }
}
