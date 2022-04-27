import useSWR from 'swr'
import axios from 'axios'
import produce from 'immer'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyShopItems() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/shop/items' : null, fetcher)

  const createMyShopItems = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/shop/items',
      data: values
    }).then((resp) => {
      mutate(produce(data, (draft) => {
        draft.push(resp.data)
      }))
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    items: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createMyShopItems
  }
}
