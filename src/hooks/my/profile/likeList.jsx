import useSWR from 'swr'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyProfileLikeList() {
  const { query: { likeListId } } = useRouter()
  const { data, error, mutate } = useSWR(likeListId ? `/api/my/profile/likeList/${likeListId}` : null, fetcher)

  const deleteMyProfileLikeList = async () => {
    await axios({
      method: 'DELETE',
      url: `/api/my/profile/likeList/${likeListId}`
    }).then(() => {
      mutate()
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    likeList: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    deleteMyProfileLikeList
  }
}
