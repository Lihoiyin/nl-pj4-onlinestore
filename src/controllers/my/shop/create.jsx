import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import uploadFileAsync from '@/controllers/_helpers/upload-file'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import parseData from '@/controllers/_middlewares/parse-data'
import { shopSchema } from '@/controllers/my/shop/_schemas'

const controllersMyShopCreate = async (req, res) => {
  try {
    const session = await getSession({ req })
    if (session.user.shop || session.user.profile) return res.status(403).json({ message: 'You already have a profile!' })

    const verifiedData = await shopSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)
    const newShop = await prisma.shop.create({
      data: {
        ...verifiedData,
        logo: verifiedData.logo || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    })

    return res.status(200).json(newShop)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(parseData)
  .use(controllersMyShopCreate)
