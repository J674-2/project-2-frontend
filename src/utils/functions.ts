import type { PreviousOrderType } from "./types";

export function dateTimeFormatting(order: PreviousOrderType): {date: string, time: string} {
    const date = `${order.date_time.substring(8, 10)}/${order.date_time.substring(5, 7)}/${order.date_time.substring(0, 4)}`

    const time = `${order.date_time.substring(11, 13)}:${order.date_time.substring(14, 16)}`

    return {date: date, time: time}
}