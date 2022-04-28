import useMyShopItems from '@/hooks/my/shop/items'
import CompsCardsMyShopItems from '@/components/cards/shop/items'

export default function PageMyShopItems() {
  const { items } = useMyShopItems()
  console.log(items)

  return (
    <CompsCardsMyShopItems items={items} />
  )
}
