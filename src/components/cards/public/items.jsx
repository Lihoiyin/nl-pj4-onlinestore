import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap'
import * as React from 'react'

export default function CompsCardsMyShopItems({ items }) {
  const { push } = useRouter()
  console.log(items)

  return (
    <div className="d-flex">
      { items.map((item) => (
        <Card
          className="items-display"
          key={item.id}
          style={{ width: '18rem', margin: '20px' }}
          onClick={() => push(`/items/${item.id}`)}
        >
          <Card.Img
            variant="top"
            src={item.image}
            width={150}
            height={200}
            style={{
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <p>
              $ {item.price}
            </p>
            <p>
              Category: {item?.category}
            </p>
            <p>
              Description : {item.description}
            </p>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
