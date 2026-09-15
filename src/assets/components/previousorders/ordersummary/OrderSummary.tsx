import OrderDetails from '../../shared/OrderDetails'
import { dateTimeFormatting, orderItemsFormatting } from '../../../../utils/functions'
import { useQuery } from '@tanstack/react-query'
import { ordersOptions } from '../../../../utils/queryoptions'
import { usePage } from '../../../providers/PageProvider'
import { usePreviousOrderInfo } from '../../../providers/PreviousOrderInfoProvider'
import { useState } from 'react'
import type { FormattedOrderType } from '../../../../utils/types'

export default function OrderSummary() {

    const [orderIndex, , stopPreviousOrderFormatting, setStopPreviousOrderFormatting] = usePreviousOrderInfo()
    const [page] = usePage()

    const [dateTime, setdateTime] = useState({date: '', time: ''})
    const [formattedPreviousOrder, setFormattedPreviousOrder] = useState<FormattedOrderType>({orderItems: [], subtotal: 0, total: 0})
    
    const orders = useQuery(ordersOptions(page))

    function previousOrderFormatting() {
        if (!stopPreviousOrderFormatting && orders.isSuccess) {
            if (!orders.data.results[0]) {
                setFormattedPreviousOrder({orderItems: [], subtotal: 0, total: 0})
            } else {
                const selectedOrder = orders.data.results[orderIndex.index]
                setdateTime(dateTimeFormatting(selectedOrder))
                setFormattedPreviousOrder(orderItemsFormatting(selectedOrder))
            }
            setStopPreviousOrderFormatting(true)
        }
    }

    previousOrderFormatting()

    function dateTimeContent() {
        if (orders.isPending) {
            <p>Loading...</p> 
        } else if (orders.isError && formattedPreviousOrder.subtotal == 0) {
            return ''
        } else { 
            if(!!dateTime.date) { 
                return (
                    <>
                    <div>
                        <p>{dateTime.date}</p>
                    </div> 
                    <div>
                        <p>{dateTime.time}</p>
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
        } else if (orders.isError && formattedPreviousOrder.subtotal == 0) {
            return <OrderDetails version='previousOrder' formattedOrder={{orderItems: [], subtotal: 0, total: 0}} />
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