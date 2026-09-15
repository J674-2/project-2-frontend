import ListOfOrders from './listoforders/ListOfOrders'
import OrderSummary from './ordersummary/OrderSummary'

export default function PreviousOrders() {
    return (
        <>
        <h2>Previous Orders</h2>
        <div>
            <ListOfOrders />
            <OrderSummary />
        </div>
        </>
    )
}