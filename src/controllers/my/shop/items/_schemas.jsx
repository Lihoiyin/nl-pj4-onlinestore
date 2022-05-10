import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  image: yup.mixed(),
  category: yup.string().required(),
  inStock: yup.number().required()
})
