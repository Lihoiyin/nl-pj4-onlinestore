import useSWR from 'swr'
import axios from 'axios'
import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyProfileOrders() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/profile/orders' : null, fetcher)

  const createMyProfileOrders = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/profile/orders',
      data: values
    }).then(() => {
      mutate()
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    orders: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createMyProfileOrders
  }
}
