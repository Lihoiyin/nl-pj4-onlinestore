import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useItems() {
  const { query: { page }, isReady } = useRouter()
  const { data, error } = useSWR(isReady ? ['/api/items', { page: Number(page) || 1 }] : null, fetcher)

  return {
    meta: data?.meta,
    items: data?.items || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
