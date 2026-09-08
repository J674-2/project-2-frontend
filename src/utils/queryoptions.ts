import { queryOptions } from '@tanstack/react-query'

async function fetchOrders(page: number) {
    const response = await fetch(`https://portfolioapp1.com/api/orders?page=${page}`)
    if (!response.ok) {
        throw new Error()
    }
    return response.json()
}

export function ordersOptions(page: number) {
    return queryOptions({
        queryKey: ['orders', page],
        queryFn: () => fetchOrders(page)
    })
}