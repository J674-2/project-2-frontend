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

    function messageContent() {
        if (mutation.isPending) {
            return <p>Processing order...</p>
        } else if (mutation.isError) {
            return <p>Order creation was unsuccessful.</p>
        } else if (mutation.isSuccess){
            return <p>Order creation was successful.</p>
        }
    }

    return (
        <>
        <div>
            <h2>Make an Order</h2>
        </div>
        <div>
            <p>
                Here you will be able to make an order, by adding items from the menu to the cart and then adjusting the quantity of each item in the cart. 
                When choosing the quantity, there is a limit of 6 per item. 
                Lastly, click on the 'Make Order' button to submit the order. 
            </p>
        </div>
        <div>
            <Menu />
            <Cart />
        </div>
        <div>
            <button disabled={isDisabled()} onClick={() => mutation.mutate()}>Make Order</button>
            <div>
                {messageContent()}
            </div>
        </div>
        </>
    )
}