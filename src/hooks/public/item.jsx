import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function usePublicItem() {
  const { query: { itemId } } = useRouter()
  const { data, error } = useSWR(itemId ? `/api/public/items/${itemId}` : null, fetcher)

  return {
    item: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
