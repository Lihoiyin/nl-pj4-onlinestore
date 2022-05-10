import useSWR from 'swr'
import axios from 'axios'
import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyProfileLikeLists() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/profile/likeList' : null, fetcher)

  const createMyProfileLikeList = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/profile/likeList',
      data: values
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
    createMyProfileLikeList
  }
}
