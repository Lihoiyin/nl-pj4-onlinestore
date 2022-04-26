import { getSession } from 'next-auth/react'

const authenticateShop = async (req, res, next) => {
  const session = getSession({ req })

  if (!session?.user?.shop) return res.status(401).json({ message: 'You are not a Shop!' })
  return next()
}

export default authenticateShop
