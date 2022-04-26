import Head from 'next/head'
import useShop from '@/hooks/my/shop'
import useMySelf from '@/hooks/my/self'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  phoneNum: '',
  category: '',
  logo: null
}
export default function CreateShop() {
  const { createShop } = useShop()
  const { self } = useMySelf()
  return (
    <div>
      <Head>
        <title>Create Shop</title>
      </Head>
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => createShop(data)}
        enableReinitialize
        validationSchema={
        Yup.object({
          name: Yup.string().required().label('Name'),
          phoneNum: Yup.string().required().label('Phone Number'),
          category: Yup.string().required().label('Category'),
          logo: Yup.mixed().required().label('Logo')
        })
      }
      >
        {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Name</label>
              <Field
                className={`form-control ${e?.name && t?.name && 'is-invalid'}`}
                name="name"
                type="text"
                placeholder="Happy Shop"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="name"
                component="div"
              />
            </div>

            <div className="mb-3">
              <label>Phone Number</label>
              <Field
                className={`form-control ${e?.phoneNum && t?.phoneNum && 'is-invalid'}`}
                name="phoneNum"
                type="text"
                placeholder="00000000"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="phoneNum"
                component="div"
              />
            </div>

            <div className="mb-3">
              <label>Category</label>
              <Field
                className={`form-control ${e?.category && t?.category && 'is-invalid'}`}
                name="category"
                type="text"
                placeholder="Food"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="category"
                component="div"
              />
            </div>

            <div className="mb-3">
              <label>Logo image</label>
              <Field
                className={`form-control ${e?.logo && t?.logo && 'is-invalid'}`}
                name="logo"
                type="file"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="logo"
                component="div"
              />
            </div>

            <button className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
      </Formik>
      <div>
        Shop Id:{self.shop?.id}
        Shop name:{self.shop?.name}
        logo:{self.shop?.logo}
      </div>
    </div>
  )
}
