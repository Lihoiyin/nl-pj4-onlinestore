import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function usePublicShop() {
  const { query: { shopId } } = useRouter()
  const { data, error } = useSWR(shopId ? `/api/shop/${shopId}` : null, fetcher)

  return {
    shop: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
