import OrderDetails from '../../shared/OrderDetails'
import { useQuery } from '@tanstack/react-query'
import { ordersOptions } from '../../../../utils/queryoptions'
import { usePage } from '../../../providers/PageProvider'
import { usePreviousOrderInfo } from '../../../providers/PreviousOrderInfoProvider'

export default function OrderSummary() {

    const [, , orderDateTime, , formattedPreviousOrder] = usePreviousOrderInfo()
    const [page] = usePage()
 
    const orders = useQuery(ordersOptions(page))

    function dateTimeContent() {
        if (orders.isPending) {
            return <p>Loading...</p> 
        } else { 
            if(!!orderDateTime.date) { 
                return (
                    <>
                    <div>
                        <p>{orderDateTime.date}</p>
                    </div> 
                    <div>
                        <p>{orderDateTime.time}</p>
                    </div>
                    </>
                ) 
            } else {
                return ''
            }
        }
    }

    function orderDetailsContent() {
        if (orders.isPending) {
            return <OrderDetails version='loading' formattedOrder={{orderItems: [], subtotal: 0, total: 0}} />
        } else {
            return <OrderDetails version='previousOrder' formattedOrder={formattedPreviousOrder} />
        }
    }

    return (
        <section>
            <div>
                <div>
                    <h3>Order Summary</h3>
                </div>
                <div data-testid='order-date-time-section'>
                    {dateTimeContent()}   
                </div>
            </div>
            {orderDetailsContent()}
        </section>
    )
}