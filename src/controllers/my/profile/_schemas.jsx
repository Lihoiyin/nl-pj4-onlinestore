import * as yup from 'yup'

export const profileSchema = yup.object({
  phoneNum: yup.string().required(),
  name: yup.string().required()
})
