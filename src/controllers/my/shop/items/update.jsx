import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import uploadFileAsync from '@/controllers/_helpers/upload-file'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { schema } from '@/controllers/my/shop/items/_schemas'

const controllersMyItemsUpdate = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { body, query: { itemId } } = req
    const verifiedData = await schema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const updatedItem = await prisma.item.update({
      where: {
        id: Number(itemId)
      },
      data: {
        name: verifiedData.name,
        description: verifiedData.description,
        price: verifiedData.price,
        image: verifiedData.image || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        shopId: Number(session.user.shopId)
      }
    })

    return res.status(201).json(updatedItem)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyItemsUpdate)
