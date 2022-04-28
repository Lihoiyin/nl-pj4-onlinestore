import { useRouter } from 'next/router'
import { Card, Button } from 'react-bootstrap'
import useMyShopItem from '@/hooks/my/shop/item'

export default function CompsCardsMyShopItem() {
  const { deleteMyItem, item } = useMyShopItem()
  const { push } = useRouter()

  return (
    <Card
      key={item.id}
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
        <Button variant="primary" onClick={() => push(`/my/shop/updateitem/${item?.id}`)}>Edit</Button>
        <Button danger="danger" onClick={() => deleteMyItem()}>Delete</Button>
      </Card.Body>
    </Card>
  )
}
