import { menuItemsInfo } from '../../../../utils/variables'
import { useNewOrderInfo } from '../../../providers/NewOrderInfoProvider'
import type { Item } from '../../../../utils/types'

export default function MenuItem({ menuItem, itemNumber }: {menuItem: Item, itemNumber: 1|2|3}) {

    const [newOrder, setNewOrder, mutation] = useNewOrderInfo()

    function isDisabled() {
        for (const orderItem of newOrder.order_items) {
            if (orderItem.item == menuItem) {
                return true
            }
        }
        return false
    }
    
    function handleClick() {
        const updatedNewOrder = [...newOrder.order_items]
        updatedNewOrder.push({item: menuItem, item_quantity: 1})
        setNewOrder({order_items: updatedNewOrder})
        mutation.reset()
    }

    return (
        <div data-testid={`menu-item-${itemNumber}`} className='flex-1 flex gap-3 border-t items-center'>
            <div className='flex-1 h-full pt-2 flex items-center justify-center'>
                <img className='w-30 h-18 rounded-sm' src={menuItemsInfo[menuItem].src} alt={menuItemsInfo[menuItem].description} />
            </div>
            <div className='flex-1 h-20 flex flex-col'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <h4 className='font-normal text-base underline underline-offset-[15%] decoration-[8%]'>{menuItem.charAt(0).toUpperCase() + menuItem.substring(1)}</h4>
                    </div>
                    <div>
                        <p className='text-sm'>{'£' + menuItemsInfo[menuItem].price.toFixed(2)}</p>
                    </div>
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='flex-1 pr-2'>
                        <p className='text-[10px]'>{menuItemsInfo[menuItem].description}</p>
                    </div>
                    <div>
                        <button className='py-0 text-sm' disabled={isDisabled()} onClick={handleClick}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}