import Head from 'next/head'
import useShop from '@/hooks/my/shop'
import useMyItems from '@/hooks/my/items'
import useMySelf from '@/hooks/my/self'
import { useState } from 'react'

export default function CreateShop() {
  const { createShop } = useShop()
  const { createMyItem, items } = useMyItems()
  const { self } = useMySelf()
  const [cart, setCart] = useState([])
  return (
    <div>
      <Head>
        <title>Create Shop</title>
      </Head>
      <button
        type="button"
        onClick={() => createShop({ name: 'hello', phoneNum: 12345678 })}
      >Create</button>
      <button
        type="button"
        onClick={() => createMyItem({ name: 'hello', price: 12345678, description: '123', shopId: self.shop.id })}
      >Create items</button>
      <div>{self?.shop?.name}</div>
      <div>
        items: {items.map((item) => (
          <div key={item.id}>
            {item.id}
            <button
              type="button"
              onClick={() => {
                setCart([...cart, item.id])
                console.log(cart)
              }}
            >Add to my cart</button></div>
      )
      )}
      </div>
      <div>My Cart: {cart}</div>
    </div>
  )
}
