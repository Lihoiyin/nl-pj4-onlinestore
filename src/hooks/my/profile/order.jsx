import useSWR from 'swr'
import { useRouter } from 'next/router'
import { fetcher } from '@/hooks/_utils'

export default function useMyProfileOrder() {
  const { query: { orderId } } = useRouter()
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? `/api/my/profile/orders/${orderId}` : null, fetcher)

  return {
    meta: data?.meta,
    orders: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
