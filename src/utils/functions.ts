import type { PreviousOrderType, NewOrderType, FormattedOrderType } from "./types";
import { menuItemsInfo } from './variables';

export function dateTimeFormatting(order: PreviousOrderType): {date: string, time: string} {
    const date = `${order.date_time.substring(8, 10)}/${order.date_time.substring(5, 7)}/${order.date_time.substring(0, 4)}`

    const time = `${order.date_time.substring(11, 13)}:${order.date_time.substring(14, 16)}`

    return {date: date, time: time}
}

export function orderItemsFormatting(order: PreviousOrderType | NewOrderType): FormattedOrderType {
    let orderItems: {item: string, price: number, itemQuantity: number}[] = []
    let subtotal = 0
    for (const orderItem of order.order_items) {
        const itemPrice = menuItemsInfo[orderItem.item]['price']
        orderItems.push({item: orderItem.item.charAt(0).toUpperCase() + orderItem.item.substring(1), price: itemPrice, itemQuantity: orderItem.item_quantity})
        const priceForQuantity = orderItem.item_quantity * itemPrice
        subtotal += priceForQuantity 
    }
    const deliveryCost = 2.20
    return {orderItems: orderItems, subtotal: subtotal, total: subtotal + deliveryCost}
}