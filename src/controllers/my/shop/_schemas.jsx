import * as yup from 'yup'

export const shopSchema = yup.object({
  phoneNum: yup.string().required(),
  name: yup.string().required(),
  category: yup.string(),
  logo: yup.mixed()
})
