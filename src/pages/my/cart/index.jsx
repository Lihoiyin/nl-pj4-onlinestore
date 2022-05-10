import { Card, Button } from 'react-bootstrap'
import { useCart } from '@/contexts/CartProvoider'
import { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useMyProfileOrders from '@/hooks/my/profile/orders'

export default function PublicMyCart() {
  const { cartState, cleanCart, deleteStuff } = useCart()
  const [cartTotal, setCartTotal] = useState(0)
  const { orders, createMyProfileOrders } = useMyProfileOrders()

  useEffect(() => {
    let total = 0
    cartState.forEach((cart) => {
      total += (cart.itemOnCart.quantity * cart.itemOnCart.price)
    })
    setCartTotal(total)
  }, [cartState])

  const onSubmit = (data) => {
    createMyProfileOrders({
      totalPrice: cartTotal,
      address: data.address,
      itemOnOrders: cartState.map((cart) => (
        cart.itemOnCart
      )),
      shops: cartState.map((cart) => cart.shop)
    })
    cleanCart()
    console.log(orders)
  }

  return (
    <>
      <Button variant="danger" onClick={() => cleanCart()} style={{ right: '0', position: 'absolute' }}>Clean All</Button>
      <div className="d-flex">
        { cartState.map((cart) => (
          <Card
            key={cart.itemOnCart?.id}
            id={cart.itemOnCart?.itemId}
            style={{ width: '18rem', margin: '20px' }}
          >
            <Card.Img id={cart.itemOnCart?.id} variant="top" src={cart.itemOnCart?.image} />
            <Card.Body>
              <Card.Title>{cart.itemOnCart?.name}</Card.Title>
              <Card.Text>
                $ {cart.itemOnCart?.price}
              </Card.Text>
              <Card.Text>
                Quantity: {cart.itemOnCart?.quantity}
              </Card.Text>
              <Card.Text>
                Subtotal: {cart.itemOnCart.quantity * cart.itemOnCart.price}
              </Card.Text>
              <Card.Text id={cart.shop?.id}>
                Product from: {cart.shop?.shopName}
              </Card.Text>
            </Card.Body>
            <Button variant="danger" onClick={() => deleteStuff(cart.itemOnCart?.id)}>Cancel</Button>
          </Card>
        ))}
      </div>
      <div>
        <Formik
          initialValues={{ address: '' }}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={Yup.object({
            address: Yup.string().required().label('Address')
          })}
        >
          {
            ({ errors: e, touched: t, isSubmitting }) => (
              <Form className=" col-8 d-flex flex-column align-items-center">
                <div className="d-flex" style={{ right: '0', bottom: '0', position: 'absolute' }}>
                  <Field
                    style={{ width: '500px', margin: '20px' }}
                    className={`form-control ${e?.quantity && t?.quantity && 'is-invalid'}`}
                    name="address"
                    type="text"
                    placeholder="Shipping Address"
                  />
                  <ErrorMessage
                    className="invalid-feedback"
                    name="address"
                    component="div"
                  />
                  <div className=" d-flex align-items-center"><h4>Total $ {cartTotal}</h4></div>
                  <Button variant="success" type="submit" disabled={isSubmitting} style={{ width: '200px', margin: '20px' }}>Check Out</Button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </>
  )
}
