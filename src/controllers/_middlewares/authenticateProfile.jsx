import { getSession } from 'next-auth/react'

const authenticateProfile = async (req, res, next) => {
  const session = getSession({ req })

  if (!session?.user?.profile) return res.status(401).json({ message: 'You are not a User!' })
  return next()
}

export default authenticateProfile
