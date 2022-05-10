import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Card } from 'react-bootstrap'
import React, { useState } from 'react'
import usePublicItem from '@/hooks/public/item'
import { useCart } from '@/contexts/CartProvoider'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import useMyProfileReviews from '@/hooks/my/profile/reviews'

import { bsBsSuitHeartFill } from 'react-icons/bs'

const orderInitialValues = {
  quantity: 1
}

const star = <bsBsSuitHeartFill />

const commentInitialValues = {
  rating: 5,
  comment: 'Leave a comment'
}

const commentSchema = Yup.object({
  rating: Yup.number().required().label('Rating'),
  comment: Yup.string().required().label('Comment')
})

const orderSchema = Yup.object({
  quantity: Yup.string().required().label('Quantity')
})

export default function CompsCardsPublicItem() {
  const { push } = useRouter()
  const { cartState, updateCart } = useCart()
  const [btn, setBtn] = useState('Add to your Cart!')
  const { item } = usePublicItem()
  const { createMyProfileReviews } = useMyProfileReviews()
  console.log(item?.review)
  const addStars = (rating) => {
    let stars
    for (let i = 0; i < Number(rating); i + 1) {
      stars += <bsBsSuitHeartFill />
    }
    return stars
  }

  const onSubmit = (data) => {
    setBtn('Added!')
    updateCart(
      {
        itemOnCart: {
          id: uuidv4(),
          itemId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: data.quantity,
          subtotal: data.quantity * item.price
        },
        shop: { shopId: item.shop.id, shopName: item.shop.name }
      }
    )
    push('/items')
  }

  const addReview = (data) => {
    createMyProfileReviews({ ...data, itemId: item.id })
  }

  return (
    <div className="d-flex-column align-items-center align-self-center" style={{ marginLeft: '50px' }}>
      <Card
        key={item?.id}
        style={{ marginTop: '50px', width: '70%', display: 'flex', flexDirection: 'row' }}
      >
        <Card.Img id={item?.id} variant="top" src={item?.image} style={{ width: '30%' }} />
        <Card.Body style={{ width: '70%', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <Card.Title>{item?.name}</Card.Title>
          <Card.Text>
            $ {item?.price}
          </Card.Text>
          <Card.Text>
            {item?.category}
          </Card.Text>
          <Card.Text>
            Description: {item?.description}
          </Card.Text>
          <Formik
            initialValues={orderInitialValues}
            onSubmit={onSubmit}
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
                placeholder="1"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="quantity"
                component="div"
              />
            </div>
            <button className="btn btn-dark float-end" type="submit" disabled={isSubmitting}>{btn}</button>
          </Form>
        )
      }
          </Formik>
        </Card.Body>
      </Card>
      <Formik
        initialValues={commentInitialValues}
        onSubmit={addReview}
        enableReinitialize
        validationSchema={commentSchema}
      >
        {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form style={{ padding: '50px', backgroundColor: 'white', marginTop: '50px', width: '70%', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
            <h2>Leave a Review</h2>
            <div className="mb-3">
              <label>Rating</label>
              <Field
                className={`form-control ${e?.rating && t?.rating && 'is-invalid'}`}
                name="rating"
                type="text"
                placeholder="1 to 5"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="rating"
                component="div"
              />
              <label>Comment</label>
              <Field
                className={`form-control ${e?.comment && t?.comment && 'is-invalid'}`}
                name="comment"
                type="text"
                placeholder="1"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="comment"
                component="div"
              />
              <button className="btn btn-dark float-end" style={{ margin: '10px' }} type="submit" disabled={isSubmitting}>Submit</button>
            </div>
          </Form>
        )
      }
      </Formik>
      <div style={{ margin: '20px', backgroundColor: 'white' }}>
        {item?.review?.map((chat) => (
          <div style={{ margin: '20px', backgroundColor: '#f2f2f2' }}>
            <div>{chat.profile.user.name} : {chat.comment}</div>
            <div>{addStars(chat.rating)}</div>
          </div>
        ))}
      </div>

    </div>

  )
}
