import useSWR from 'swr'
import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyShopOrders() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? '/api/my/shop/orders' : null, fetcher)

  return {
    meta: data?.meta,
    orders: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
