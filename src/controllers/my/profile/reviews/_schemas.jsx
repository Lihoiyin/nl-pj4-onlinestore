import * as yup from 'yup'

export const schema = yup.object({
  rating: yup.number().required(),
  comment: yup.string().required(),
  itemId: yup.number().required()
})
