import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function usePublicShops() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? ['/api/shops'] : null, fetcher)

  return {
    meta: data?.meta,
    shops: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
