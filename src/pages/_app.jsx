import '@/styles/globals.scss'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import appWithSession from '@/hoc/appWithSession'
import CompsLayoutsNavbar from '@/components/layouts/Navbar'

function MyApp({ Component, pageProps }) {
  const { status, data: session } = useSession()
  const { pathname, push } = useRouter()

  if (status === 'authenticated') {
    if (!pathname.includes('/select-type') && (!session?.user?.profile || !session?.user?.shop)) {
      push('/select-type')
      return null
    }

    if (pathname.includes('/select-type') && (session?.user?.profile || session?.user?.shop)) {
      push('/')
      return null
    }
  }

  return (
    <>
      <CompsLayoutsNavbar />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default appWithSession(appWithTranslation(MyApp))
