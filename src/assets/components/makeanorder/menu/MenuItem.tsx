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
        <div data-testid={`menu-item-${itemNumber}`}>
            <div>
                <img src={menuItemsInfo[menuItem].src} alt={menuItemsInfo[menuItem].description} />
            </div>
            <div>
                <div>
                    <h4>{menuItem.charAt(0).toUpperCase() + menuItem.substring(1)}</h4>
                </div>
                <div>
                    <p>{'£' + menuItemsInfo[menuItem].price.toFixed(2)}</p>
                </div>
                <div>
                    <p>{menuItemsInfo[menuItem].description}</p>
                </div>
                <div>
                    <button disabled={isDisabled()} onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}