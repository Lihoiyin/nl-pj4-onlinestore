import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap'

export default function CompsPublicCardsItems({ items }) {
  const { push } = useRouter()
  console.log(items)
  return (
    <div className="d-flex">
      { items.map((item) => (
        <Card
          key={item.id}
          style={{ width: '18rem', margin: '20px' }}
          onClick={() => push(`/my/shop/items/${item.id}`)}
        >
          <Card.Img id={item.id} variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              $ {item.price}
            </Card.Text>
            <Card.Text>
              Description: {item.category}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
