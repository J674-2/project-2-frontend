type Item = 'toast'|'salad'|'croquettes'|'pie'|'burger'|'spaghetti'|'ice cream'|'cookies'|'strawberries'

export interface PreviousOrderType {
    id: number, 
    date_time: string,
    order_items: {id: number, item: Item , item_quantity: number}[]
}

export interface PreviousOrdersType {
    count: number,
    next: null | string,
    previous: null | string,
    results: PreviousOrderType[]
}

export type NewOrderType = {order_items: {item: Item , item_quantity: number}[]}

export interface FormattedOrderType {
    orderItems: {item: string, price: number, itemQuantity: number}[],
    subtotal: number, 
    total: number
}