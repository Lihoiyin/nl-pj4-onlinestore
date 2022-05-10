import useSWR from 'swr'
import axios from 'axios'
import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyProfileReviews() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/profile/reviews' : null, fetcher)

  const createMyProfileReviews = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/profile/reviews',
      data: values
    }).then(() => {
      mutate()
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    reviews: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createMyProfileReviews
  }
}
