import Head from 'next/head'

import useShop from '@/hooks/my/shop'

export default function CreateShop() {
  const { createShop } = useShop()

  return (
    <div>
      <Head>
        <title>Create Shop</title>
      </Head>
      <button
        type="button"
        onClick={() => createShop({ name: 'hello', phoneNum: 12345678 })}
      >Create</button>

    </div>
  )
}
