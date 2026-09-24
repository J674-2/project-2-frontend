import type { FormattedOrderType } from '../../../utils/types'
import MinusButton from '../makeanorder/cart/MinusButton'
import PlusButton from '../makeanorder/cart/PlusButton'

export default function OrderDetails({version , formattedOrder}: {version: 'previousOrder'|'loading'|'newOrder', formattedOrder: FormattedOrderType}) {

    function itemsContent() {
        if (version == 'loading') {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }
        if (formattedOrder.orderItems[0] != undefined) {
            return (
                <ul>
                    {formattedOrder.orderItems.map((item, index) => {
                        return (
                            <li data-testid={`order-item-${index + 1}`} key={item.item}>
                                <span>{item.item}:</span>
                                <span>£{item.price.toFixed(2)}</span>
                                <span>
                                    {version == 'previousOrder' ? 'x': <MinusButton item={item.item.toLowerCase()} itemQuantity={item.itemQuantity} />}
                                    {item.itemQuantity}
                                    {version == 'newOrder' && item.itemQuantity < 6 ? <PlusButton item={item.item.toLowerCase()} itemQuantity={item.itemQuantity} /> : ''}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    return (
        <div>
            <div>
                <h4>Items:</h4>
                <div data-testid='order-items-section'>
                    {itemsContent()}
                </div>
            </div>
            <div>
                <div data-testid='order-subtotal-section'>
                    <h4>Subtotal: </h4>
                    {version == 'loading' ? <p>Loading...</p> : <p>{'£' + formattedOrder.subtotal.toFixed(2)}</p>}
                </div>
                <div data-testid='order-delivery-cost-section'>
                    <h4>Delivery cost: </h4>
                    {version == 'loading' ? <p>Loading...</p> : <p>{formattedOrder.subtotal == 0 ? '£0.00' : '£2.20'}</p>}
                </div>
            </div>
            <div data-testid='order-total-section'>
                <h4>Total: </h4>
                {version == 'loading' ? <p>Loading...</p> : <p>{'£' + formattedOrder.total.toFixed(2)}</p>}
            </div>
        </div>
    )
}