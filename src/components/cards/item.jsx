import useMyShopItem from '@/hooks/my/shop/item'
import { useRouter } from 'next/router'
import { Card, Button } from 'react-bootstrap'

export default function PageMyShopItems() {
  const { item, deleteItem } = useMyShopItem()
  const { push } = useRouter()
  console.log(item)
  return (
    <Card
      key={item.id}
      style={{ width: '18rem' }}
    >
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.price}
        </Card.Text>
        <Card.Text>
          {item.category}
        </Card.Text>
        <Card.Text>
          {item.description}
        </Card.Text>
        <Button variant="primary" onClick={() => push('')}>Edit</Button>
        <Button danger="danger" onClick={() => deleteItem()}>Delete</Button>
      </Card.Body>
    </Card>
  )
}
