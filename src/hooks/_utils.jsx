import axios from 'axios'
import { toast } from 'react-toastify'

export const fetcher = (url, query = {}) => axios.get(url, { params: query }).then((res) => res.data)

export const handleErrors = (err) => {
  // Console Log for debugging purposes
  console.log(err) // eslint-disable-line
  console.log(err.response) // eslint-disable-line

  switch (err.response.status) {
    case 401:
    case 403: {
      toast.error(err.response.data.message)
      break
    }
    case 406: {
      err.response.data.errors.forEach((error) => {
        toast.error(error.msg)
      })
      break
    }
    default: {
      toast.error('Something is wrong with the server')
    }
  }
}

export const reloadSession = () => {
  const event = new Event('visibilitychange')
  document.dispatchEvent(event)
}
