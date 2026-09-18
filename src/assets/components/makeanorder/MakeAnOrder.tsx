import Menu from './menu/Menu'
import Cart from './cart/Cart'

export default function MakeAnOrder() {

    return (
        <>
        <h2>Make an Order</h2>
        <div>
            <Menu />
            <Cart />
        </div>
        </>
    )
}