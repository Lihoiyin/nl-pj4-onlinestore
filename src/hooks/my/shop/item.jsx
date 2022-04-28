import useSWR from 'swr'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'
import { serialize } from 'object-to-formdata'

export default function useMyShopItem() {
  const { query: { itemId }, push } = useRouter()
  const { data, error, mutate } = useSWR(itemId ? `/api/my/shop/items/${itemId}` : null, fetcher)

  const updateMyItem = async (values) => {
    await axios({
      method: 'PUT',
      url: `/api/my/shop/items/${itemId}`,
      data: serialize(values, { indices: true })
    }).then(() => {
      mutate()
      push(`/my/shop/items/${itemId}`)
    }).catch(handleErrors)
  }

  const deleteMyItem = async () => {
    await axios({
      method: 'DELETE',
      url: `/api/my/shop/items/${itemId}`
    }).then(() => {
      mutate()
      push('/my/shop/items')
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
