import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import useMyShop from '@/hooks/my/shop'
import useMyProfile from '@/hooks/my/profile'

const profileInitialValues = {
  name: '',
  phoneNum: ''
}

const profileSchema = Yup.object({
  name: Yup.string().required().label('Name'),
  phoneNum: Yup.string().required().label('Phone Number')
})

const shopInitialValues = {
  name: '',
  phoneNum: '',
  category: '',
  logo: ''
}

const shopSchema = Yup.object({
  name: Yup.string().required().label('Name'),
  phoneNum: Yup.string().required().label('Phone Number')
  // TODO category and logo
})

export default function CompsFormsCreateTypeProfile({ userType }) {
  const { createShop } = useMyShop()
  const { createProfile } = useMyProfile()

  const onSubmit = async (data) => {
    if (userType === 'profile') {
      await createProfile(data)
    } else {
      await createShop(data)
    }
  }

  return (
    <Formik
      initialValues={userType === 'profile' ? profileInitialValues : shopInitialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={userType === 'profile' ? profileSchema : shopSchema}
    >
      {
        ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label>Name</label>
              <Field
                className={`form-control ${e?.name && t?.name && 'is-invalid'}`}
                name="name"
                type="text"
                placeholder="Joey"
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

            {
              userType === 'shop' && (
                <>
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
                    <label className="form-label" htmlFor="formLogo">Logo</label>
                    <input
                      id="formLogo"
                      className={`form-control ${e?.logo?.file && t?.logo?.file && 'is-invalid'}`}
                      type="file"
                      onChange={(event) => setFieldValue('logo', event.currentTarget.files[0])}
                      accept="image/*"
                    />
                    <ErrorMessage
                      className="invalid-feedback text-center"
                      name="logo"
                      component="div"
                    />
                  </div>
                </>
              )
            }

            <button className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}
