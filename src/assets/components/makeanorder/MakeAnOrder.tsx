import Menu from './menu/Menu'
import Cart from './cart/Cart'
import { useNewOrderInfo } from '../../providers/NewOrderInfoProvider'

export default function MakeAnOrder() {

    const [newOrder, , mutation] = useNewOrderInfo()

    function isDisabled() {
        if (newOrder.order_items[0] == undefined) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
        <h2>Make an Order</h2>
        <div>
            <Menu />
            <Cart />
        </div>
        <div>
            <button disabled={isDisabled()} onClick={() => mutation.mutate()}>Make Order</button>
        </div>
        </>
    )
}