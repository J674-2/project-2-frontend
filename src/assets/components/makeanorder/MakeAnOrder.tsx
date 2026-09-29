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
            return <p className='text-error-red'>Order creation was unsuccessful.</p>
        } else if (mutation.isSuccess){
            return <p>Order creation was successful.</p>
        }
    }

    return (
        <>
        <div className='flex justify-center'>
            <h2>Make an Order</h2>
        </div>
        <div>
            <p className='text-center'>
                Here you will be able to make an order, by adding items from the menu to the cart and then adjusting the quantity of each item in the cart. 
                When choosing the quantity, there is a limit of 6 per item. 
                Lastly, click on the 'Make Order' button to submit the order. 
            </p>
        </div>
        <div className='flex flex-col gap-6 sm:gap-8'>
            <Menu />
            <Cart />
        </div>
        <div className='flex flex-col items-center'>
            <button disabled={isDisabled()} onClick={() => mutation.mutate()}>Make Order</button>
            <div className='mt-6 empty:mt-0'>
                {messageContent()}
            </div>
        </div>
        </>
    )
}