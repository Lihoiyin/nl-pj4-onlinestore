import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import useMyShopItems from '@/hooks/my/shop/items'
import useMyShopItem from '@/hooks/my/shop/item'
import { useRouter } from 'next/router'

const itemInitialValues = {
  name: '',
  price: '',
  description: '',
  category: '',
  image: ''
}

const itemSchema = Yup.object({
  name: Yup.string().required().label('Name'),
  price: Yup.string().required().label('Price'),
  description: Yup.string().required().label('Description'),
  category: Yup.string().required().label('Category'),
  image: Yup.mixed().required().label('Image')
})

export default function CompsFormsCreateOrEditItem({ createOrEdit }) {
  const { createMyShopItems } = useMyShopItems()
  const { updateMyItem } = useMyShopItem()
  const { push } = useRouter()

  const onSubmit = async (data) => {
    if (createOrEdit === 'create') {
      await createMyShopItems(data)
      push('/my/shop/items')
    }
    if (createOrEdit === 'update') {
      await updateMyItem(data)
      push('/my/shop/items')
    }
  }

  return (
    <Formik
      initialValues={itemInitialValues}
      onSubmit={(onSubmit)}
      enableReinitialize
      validationSchema={itemSchema}
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
                placeholder="Pencil"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="name"
                component="div"
              />
            </div>

            <div className="mb-3">
              <label>Price</label>
              <Field
                className={`form-control ${e?.price && t?.price && 'is-invalid'}`}
                name="price"
                type="text"
                placeholder="100.00"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="price"
                component="div"
              />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <Field
                className={`form-control ${e?.description && t?.description && 'is-invalid'}`}
                name="description"
                type="text"
                placeholder="Good Product"
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
              <label className="form-label" htmlFor="formImage">Image</label>
              <input
                id="formImage"
                className={`form-control ${e?.image?.file && t?.image?.file && 'is-invalid'}`}
                type="file"
                name="image"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                accept="image/*"
              />
              <ErrorMessage
                className="invalid-feedback text-center"
                name="Image"
                component="div"
              />
            </div>

            <button className="btn btn-dark float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}
