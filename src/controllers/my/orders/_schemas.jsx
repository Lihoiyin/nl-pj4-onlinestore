import * as yup from 'yup'

export const schema = yup.object({
  totalPrice: yup.number().required(),
  address: yup.string().required(),
  profileId: yup.number().required(),
  shop: yup.array().of(yup.object({
    shopId: yup.number().required()
  })),
  itemOnOrders: yup.array().of(yup.object({
    itemId: yup.number().required(),
    quantity: yup.number().required(),
    subtotal: yup.number().required()
  }))
})
