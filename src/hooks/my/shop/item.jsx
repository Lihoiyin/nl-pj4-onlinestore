import useSWR from 'swr'
import axios from 'axios'
// import produce from 'immer'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyShopItem() {
  const { query: { itemId }, push } = useRouter()
  const { data, error, mutate } = useSWR(itemId ? `/api/my/shop/items/${itemId}` : null, fetcher)

  const updateMyItem = async (values) => {
    await axios({
      method: 'PUT',
      url: `/api/my/shop/items/${itemId}`,
      data: values
    }).then(() => {
      mutate()
      push(`/my/shop/items/${itemId}`)
    }).catch(handleErrors)
  }
  const deleteMyItem = async (values) => {
    await axios({
      method: 'DElETE',
      url: `/api/my/shop/items/${itemId}`,
      data: values
    }).then(() => {
      mutate()
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    item: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    deleteMyItem,
    updateMyItem
  }
}
