import useSWR from 'swr'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyShopItem() {
  const { query: { reviewId } } = useRouter()
  const { data, error, mutate } = useSWR(reviewId ? `/api/my/profile/reviews/${reviewId}` : null, fetcher)

  const deleteMyReviews = async () => {
    await axios({
      method: 'DELETE',
      url: `/api/my/profile/reviews/${reviewId}`
    }).then(() => {
      mutate()
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    review: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    deleteMyReviews
  }
}
