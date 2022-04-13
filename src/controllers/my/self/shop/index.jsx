import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { shopSchema } from '@/controllers/my/self/_schemas'
import uploadFileAsync from '@/controllers/_helpers/upload-file'

const controllersApiShopCreate = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await shopSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const newShop = await prisma.shop.create({
      data: {
        name: verifiedData.name,
        phoneNum: verifiedData.description,
        logo: verifiedData.logo || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        userId: Number(req.session.userId)
      }
    })

    return res.status(201).json(newShop)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiShopCreate)
