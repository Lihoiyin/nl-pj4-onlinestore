import { getSession } from 'next-auth/react'

import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import uploadFileAsync from '@/controllers/_helpers/upload-file'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import parseData from '@/controllers/_middlewares/parse-data'
import { schema } from '@/controllers/my/shop/items/_schemas'

const controllersMyItemsCreate = async (req, res) => {
  try {
    const { body } = req
    const session = await getSession({ req })
    const verifiedData = await schema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const newItem = await prisma.item.create({
      data: {
        ...verifiedData,
        shop: {
          connect: {
            id: Number(session.user.shop.id)
          }
        }
      }
    })
    return res.status(201).json(newItem)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(parseData)
  .use(controllersMyItemsCreate)
