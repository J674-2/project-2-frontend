import type { FormattedOrderType } from '../../../utils/types'
import MinusButton from '../makeanorder/cart/MinusButton'
import PlusButton from '../makeanorder/cart/PlusButton'

export default function OrderDetails({version , formattedOrder}: {version: 'previousOrder'|'loading'|'newOrder', formattedOrder: FormattedOrderType}) {

    function itemsContent() {
        if (version == 'loading') {
            return (
                <div className='flex-1 flex items-center'>
                    <p>Loading...</p>
                </div>
            )
        }
        if (formattedOrder.orderItems[0] != undefined) {
            return (
                <ul className='flex flex-col gap-4'>
                    {formattedOrder.orderItems.map((item, index) => {
                        return (
                            <li data-testid={`order-item-${index + 1}`} key={item.item} className='flex gap-4 items-center'>
                                <span className='text-xl sm:text-1.5xl font-markazi'>{item.item}:</span>
                                <span>£{item.price.toFixed(2)}</span>
                                <span className='flex items-center'>
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
        <div className='flex flex-col'>
            <div className='h-50 py-4 flex flex-col gap-2 border-t'>
                <h4>Items:</h4>
                <div data-testid='order-items-section' className='flex-1 overflow-y-auto flex flex-col'>
                    {itemsContent()}
                </div>
            </div>
            <div className='py-4 flex flex-col gap-2 border-t'>
                <div data-testid='order-subtotal-section' className='flex gap-4 items-center'>
                    <h4>Subtotal: </h4>
                    {version == 'loading' ? <p>Loading...</p> : <p>{'£' + formattedOrder.subtotal.toFixed(2)}</p>}
                </div>
                <div data-testid='order-delivery-cost-section' className='flex gap-4 items-center'>
                    <h4>Delivery cost: </h4>
                    {version == 'loading' ? <p>Loading...</p> : <p>{formattedOrder.subtotal == 0 ? '£0.00' : '£2.20'}</p>}
                </div>
            </div>
            <div data-testid='order-total-section' className='py-4 flex gap-4 border-t'>
                <h4 className='text-2xl sm:text-2.3xl'>Total: </h4>
                {version == 'loading' ? <p className='text-xl sm:text-1.5xl'>Loading...</p> : <p className='text-xl sm:text-1.5xl'>{'£' + formattedOrder.total.toFixed(2)}</p>}
            </div>
        </div>
    )
}