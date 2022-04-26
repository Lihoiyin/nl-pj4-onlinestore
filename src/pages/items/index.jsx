import Head from 'next/head'
import useMyProfile from '@/hooks/my/profile'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  phoneNum: ''
}
export default function CreateItem() {
  const { createProfile } = useMyProfile()

  return (
    <div>
      <Head>
        <title>Create Profile</title>
      </Head>
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => createProfile(data)}
        enableReinitialize
        validationSchema={
        Yup.object({
          name: Yup.string().required().label('Name'),
          phoneNum: Yup.string().required().label('Phone Number')
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

            <button className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
      </Formik>
    </div>
  )
}
