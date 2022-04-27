import useMyShopItems from '@/hooks/my/shop/items'
import useMyShopItem from '@/hooks/my/shop/item'

import { Card, Button } from 'react-bootstrap'

export default function PageMyShopItems() {
  const { items } = useMyShopItems()
  const { deleteItem } = useMyShopItem()
  console.log(items)
  return (
    <div>
      { items.map((item) => (
        <Card key={item.id} style={{ width: '18rem' }}>
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
            <Button variant="primary">Edit</Button>
            <Button danger="danger" onClick={() => deleteItem()}>Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
