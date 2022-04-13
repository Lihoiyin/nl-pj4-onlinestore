import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { profileSchema } from '@/controllers/my/self/_schemas'

const controllersApiProfileCreate = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await profileSchema.validate(body, { abortEarly: false, stripUnknown: true })

    const newProfile = await prisma.profile.create({
      data: {
        name: verifiedData.name,
        phoneNum: verifiedData.description,
        userId: Number(req.session.userId)
      }
    })

    return res.status(201).json(newProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiProfileCreate)
