import useSWR from 'swr'
import axios from 'axios'
import { fetcher, handleErrors } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function usePublicItems() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? ['/api/public/items'] : null, fetcher)

  const deleteAllItems = async () => {
    await axios({
      method: 'DELETE',
      url: '/api/public/items'
    }).then(() => {
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    items: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    deleteAllItems
  }
}
