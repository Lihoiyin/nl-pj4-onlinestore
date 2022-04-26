import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { profileSchema } from '@/controllers/my/self/_schemas'
import { getSession } from 'next-auth/react'

const controllersApiMyProfileCreate = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { body } = req
    const verifiedData = await profileSchema.validate(body, { abortEarly: false, stripUnknown: true })

    const newProfile = await prisma.profile.create({
      data: {
        name: verifiedData.name,
        phoneNum: verifiedData.phoneNum,
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    })

    return res.status(201).json(newProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiMyProfileCreate)
