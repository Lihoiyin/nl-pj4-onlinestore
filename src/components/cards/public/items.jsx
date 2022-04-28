import { useRouter } from 'next/router'
import { Card } from 'react-bootstrap'

export default function CompsCardsMyShopItems({ items }) {
  const { push } = useRouter()
  console.log(items)

  return (
    <div>
      { items.map((item) => (
        <Card
          key={item.id}
          style={{ width: '18rem' }}
          onClick={() => push(`/items/${item.id}`)}
        >
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.price}
            </Card.Text>
            <Card.Text>
              {item.description}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
