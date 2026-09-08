export interface PreviousOrderType {
    id: number, 
    date_time: string,
    order_items: {id: number, item: string, item_quantity: number}[]
}

export interface PreviousOrdersType {
    count: number,
    next: null | string,
    previous: null | string,
    results: PreviousOrderType[]
}