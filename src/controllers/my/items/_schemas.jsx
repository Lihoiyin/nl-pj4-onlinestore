import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  image: yup.mixed().required(),
  shopId: yup.number().required()
})
