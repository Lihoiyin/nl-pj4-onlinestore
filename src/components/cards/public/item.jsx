import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Card } from 'react-bootstrap'
import { useState, useContext } from 'react'
import usePublicItem from '@/hooks/public/item'

const orderInitialValues = {
  quantity: 1
}

const orderSchema = Yup.object({
  quantity: Yup.number().required().label('Quantity')
})

export default function CompsCardsPublicItem() {
  const [btn, setBtn] = useState('Add to your Cart!')
  const { item } = usePublicItem()
  const { myCart, setMyCart } = useContext(Cart)

  const onSubmit = (data) => {
    setMyCart((myCart) => [...myCart,
      {

      }
    ])
    setBtn('Added!')
    console.log(myCart)
  }

  return (
    <Card
      key={item?.id}
      style={{ width: '18rem' }}
    >
      <Card.Img id={item?.id} variant="top" src={item?.image} />
      <Card.Body>
        <Card.Title>{item?.name}</Card.Title>
        <Card.Text>
          {item?.price}
        </Card.Text>
        <Card.Text>
          {item?.category}
        </Card.Text>
        <Card.Text>
          {item?.description}
        </Card.Text>
        <Formik
          initialValues={orderInitialValues}
          onSubmit={(onSubmit)}
          enableReinitialize
          validationSchema={orderSchema}
        >
          {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Quantity</label>
              <Field
                className={`form-control ${e?.quantity && t?.quantity && 'is-invalid'}`}
                name="quantity"
                type="text"
                placeholder="Pencil"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="quantity"
                component="div"
              />
            </div>
            <button className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>{btn}</button>
          </Form>
        )
      }
        </Formik>
      </Card.Body>
    </Card>
  )
}
