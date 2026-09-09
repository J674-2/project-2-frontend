import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { PreviousOrdersType } from './types'

async function fetchOrders(page: number): Promise<PreviousOrdersType> {
    const response = await fetch(`https://portfolioapp1.com/api/orders?page=${page}`)
    if (!response.ok) {
        throw new Error()
    }
    return response.json()
}

export function ordersOptions(page: number) {
    return queryOptions({
        queryKey: ['orders', page],
        queryFn: () => fetchOrders(page),
        placeholderData: keepPreviousData,
        retry: 1
    })
}