import usePublicItems from '@/hooks/public/items'
import CompsPublicCardsItems from '@/components/cards/public/items'

export default function PageMyShopItems() {
  const { items } = usePublicItems()
  console.log(items)

  return (
    <CompsPublicCardsItems items={items} />
  )
}
