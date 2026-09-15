import { dateTimeFormatting, orderItemsFormatting } from "../../../../utils/functions"
import { useQuery } from '@tanstack/react-query'
import { ordersOptions } from "../../../../utils/queryoptions"
import { usePage } from "../../../providers/PageProvider"
import { usePreviousOrderInfo } from "../../../providers/PreviousOrderInfoProvider"

export default function PreviousOrder({ index } : {index: 0 | 1 | 2}) {

    const [page] = usePage()
    const [selectedOrder, setSelectedOrder, , setOrderDateTime, , setFormattedPreviousOrder] = usePreviousOrderInfo()

    const orders = useQuery(ordersOptions(page))

    function placeholderDataColor() {
        if (orders.isPlaceholderData) {
            return 'text-gray-500'
        }
        return ''
    }

    function handleClick() {
        if (orders.isSuccess){
            setSelectedOrder({page: page, index: index})
            const order = orders.data.results[index]
            setOrderDateTime(dateTimeFormatting(order))
            setFormattedPreviousOrder(orderItemsFormatting(order))
        }
    }
    
    function content() {
        if (orders.isPending) {
            return <p>Loading...</p>
        } else if (orders.isError) {
            return <p>An error occurred.</p>
        } else {
            if (orders.data.results[index] != undefined) {
                const dateTime = dateTimeFormatting(orders.data.results[index])
                
                return (
                    <>
                    <div className={`${placeholderDataColor()}`}>
                        <div>
                            <p>{dateTime.date}</p>
                        </div>
                        <div>
                            <p>{dateTime.time}</p>
                        </div>
                    </div>
                    <div>
                        <button disabled={orders.isPlaceholderData || (selectedOrder.page == page && selectedOrder.index == index)} onClick={handleClick}>See Order</button>
                    </div>
                    </>
                )
            } 
        }
    }

    return (
        <div data-testid={`order-${index}`}>
            {content()}
        </div> 
    )
}