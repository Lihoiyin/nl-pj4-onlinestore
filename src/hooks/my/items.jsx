import useSWR from 'swr'
import axios from 'axios'
import produce from 'immer'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useItems() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/items' : null, fetcher)

  const createItem = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/items',
      data: values
    }).then((resp) => {
      mutate(produce(data, (draft) => {
        draft.items.push(resp.data)
      }))
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    items: data?.items || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createItem
  }
}
