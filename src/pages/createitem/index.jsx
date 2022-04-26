import Head from 'next/head'
import useItems from '@/hooks/items'
import useMyItems from '@/hooks/my/items'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  description: '',
  price: 0,
  image: null
}
export default function CreateItem() {
  const { createItems } = useMyItems()
  const { items } = useItems()
  console.log(items)
  return (
    <div>
      <Head>
        <title>Create Item</title>
      </Head>
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => createItems(data)}
        enableReinitialize
        validationSchema={
        Yup.object({
          name: Yup.string().required().label('Name'),
          description: Yup.string().required().label('Description'),
          category: Yup.string().required().label('Category'),
          image: Yup.mixed().required()
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
              <label>Description</label>
              <Field
                className={`form-control ${e?.description && t?.description && 'is-invalid'}`}
                name="description"
                type="text"
                placeholder="00000000"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="description"
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
              <label>image</label>
              <Field
                className={`form-control ${e?.image && t?.image && 'is-invalid'}`}
                name="image"
                type="file"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="image"
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
