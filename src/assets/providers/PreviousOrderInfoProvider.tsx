import {useContext, createContext, useState} from 'react'
import type { FormattedOrderType } from '../../utils/types'
import { usePage } from './PageProvider'
import { useQuery } from '@tanstack/react-query'
import { ordersOptions } from '../../utils/queryoptions'
import { dateTimeFormatting, orderItemsFormatting } from '../../utils/functions'

type PreviousOrderInfoContextType = null | [
        {page: number, index: 0 | 1 | 2}, 
        React.Dispatch<React.SetStateAction<{page: number, index: 0 | 1 | 2}>>, 
        {date: string; time: string;}, 
        React.Dispatch<React.SetStateAction<{date: string; time: string;}>>, 
        FormattedOrderType, 
        React.Dispatch<React.SetStateAction<FormattedOrderType>>
    ]

const PreviousOrderInfoContext = createContext<PreviousOrderInfoContextType>(null)

export default function PreviousOrderInfoProvider({ children }: {children: React.ReactElement}) {

    const[page] = usePage()

    const orders = useQuery(ordersOptions(page))

    const [selectedOrder, setSelectedOrder] = useState<{page: number, index: 0 | 1 | 2}>({page: 1, index: 0})
    const [orderDateTime, setOrderDateTime] = useState({date: '', time: ''})
    const [formattedPreviousOrder, setFormattedPreviousOrder] = useState<FormattedOrderType>({orderItems: [], subtotal: 0, total: 0})

    if (orders.isSuccess && orders.data.results[0] && orderDateTime.date == '') {
        const order = orders.data.results[0]
        setOrderDateTime(dateTimeFormatting(order))
        setFormattedPreviousOrder(orderItemsFormatting(order))
    }

    return (
        <PreviousOrderInfoContext value={[selectedOrder, setSelectedOrder, orderDateTime, setOrderDateTime, formattedPreviousOrder, setFormattedPreviousOrder]}>
            {children}
        </PreviousOrderInfoContext>
    )
}

export const usePreviousOrderInfo = () => {
    const contextValue = useContext(PreviousOrderInfoContext)
    if (!contextValue) {
        throw new Error('usePreviousOrderInfo must be used within a Provider')
    } 
    return contextValue
} 