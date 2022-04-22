import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMySelf() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? '/api/my/self' : null, fetcher)

  return {
    meta: data?.meta,
    self: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
