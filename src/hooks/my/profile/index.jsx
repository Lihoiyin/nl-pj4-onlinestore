import axios from 'axios'
import useSWR from 'swr'
import { fetcher, handleErrors } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyProfile() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/profile' : null, fetcher)

  const createProfile = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/my/profile',
      data: values
    }).then(() => {
      mutate()
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    self: data || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createProfile
  }
}
