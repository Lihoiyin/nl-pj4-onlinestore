import axios from 'axios'
import { serialize } from 'object-to-formdata'

import { handleErrors, reloadSession } from '@/hooks/_utils'

export default function useMyShop() {
  const createShop = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/shop',
      data: serialize(values, { indices: true })
    }).then(() => {
      reloadSession()
    }).catch(handleErrors)
  }

  return {
    createShop
  }
}
