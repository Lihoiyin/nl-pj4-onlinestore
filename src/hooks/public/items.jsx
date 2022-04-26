import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function usePublicItems() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? ['/api/items'] : null, fetcher)

  return {
    meta: data?.meta,
    items: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
