import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import uploadFileAsync from '@/controllers/_helpers/upload-file'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { shopSchema } from '@/controllers/my/shop/_schemas'

const controllersMyShopCreate = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { body } = req
    const verifiedData = await shopSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)
    const newShop = await prisma.shop.create({
      data: {
        name: verifiedData.name,
        phoneNum: verifiedData.phoneNum,
        category: verifiedData.category,
        logo: verifiedData.logo || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    })

    return res.status(201).json(newShop)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyShopCreate)
