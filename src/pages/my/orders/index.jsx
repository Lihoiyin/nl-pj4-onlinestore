import useMyProfileOrders from '@/hooks/my/profile/orders'
import { Table } from 'react-bootstrap'

const today = new Date()

const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
export default function PublicMyOrder() {
  const { orders } = useMyProfileOrders()
  return (
    <div>
      {
        orders.map((order) => (
          <div className="d-flex flex-column row align-items-center" style={{ margin: '20px' }}>
            <Table striped bordered hover size="sm" style={{ width: '500px', margin: '0px', border: '1px solid black' }}>
              <thead>
                <tr>
                  <th>items</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Shop</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {
                    order.itemOnOrders.map((item) => (
                      <tr>
                        <td>{item.item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.item.price}</td>
                        <td>{item.item.category}</td>
                        <td>{item.item.shop.name}</td>
                        <td>{item.item.subtotal}</td>
                      </tr>
                    ))
                  }
              </tbody>
            </Table>
            Order Date: {date} <br />
            Total: $ {order.totalPrice}
          </div>
        ))
      }
    </div>

  )
}
