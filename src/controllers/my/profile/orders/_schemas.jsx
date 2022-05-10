import * as yup from 'yup'

export const schema = yup.object({
  totalPrice: yup.number().required(),
  address: yup.string().required()
})
