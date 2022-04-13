import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { schema } from '@/controllers/my/items/_schemas'
import uploadFileAsync from '@/controllers/_helpers/upload-file'

const controllersApiMyItemsCreate = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await schema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const newItem = await prisma.item.create({
      data: {
        name: verifiedData.name,
        description: verifiedData.description,
        price: verifiedData.price,
        image: verifiedData.image || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        shopId: Number(req.session.shopId)
      }
    })

    return res.status(201).json(newItem)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersApiMyItemsCreate)
