import useSWR from 'swr'
import axios from 'axios'
import produce from 'immer'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyItems() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/items' : null, fetcher)

  const createMyItem = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/items',
      data: values
    }).then((resp) => {
      mutate(produce(data, (draft) => {
        draft.push(resp.data)
      }))
    }).catch(handleErrors)
  }
  console.log(data)
  return {
    meta: data?.meta,
    items: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createMyItem
  }
}
