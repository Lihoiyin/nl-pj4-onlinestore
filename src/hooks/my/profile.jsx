import useSWR from 'swr'
import axios from 'axios'
import produce from 'immer'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useProfile() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/self/profile' : null, fetcher)

  const createProfile = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/self/profile',
      data: values
    }).then((resp) => {
      mutate(produce(data, (draft) => {
        draft.profile.push(resp.data)
      }))
    }).catch(handleErrors)
  }

  return {
    meta: data?.meta,
    profile: data?.profile || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createProfile
  }
}
