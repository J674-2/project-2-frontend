import OrderDetails from '../../shared/OrderDetails'
import { useNewOrderInfo } from '../../../providers/NewOrderInfoProvider'
import { orderItemsFormatting } from '../../../../utils/functions'
import type { FormattedOrderType } from '../../../../utils/types'

export default function Cart() {

    const [newOrder] = useNewOrderInfo()

    function newOrderFormatting(): FormattedOrderType {
        if (newOrder.order_items[0] != undefined) {
            return orderItemsFormatting(newOrder)
        } else {
            return {orderItems: [], subtotal: 0, total: 0}
        }
    }

    return(
        <section>
            <div className='mb-6 flex justify-center'>
                <h3>Cart</h3>
            </div>
            <OrderDetails version='newOrder' formattedOrder={newOrderFormatting()}/>
        </section>
    )
} 