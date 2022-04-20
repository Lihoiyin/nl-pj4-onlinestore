import * as yup from 'yup'

export const profileSchema = yup.object({
  phoneNum: yup.number().required(),
  name: yup.string().required()
})

export const shopSchema = yup.object({
  phoneNum: yup.number().required(),
  name: yup.string().required()
})
