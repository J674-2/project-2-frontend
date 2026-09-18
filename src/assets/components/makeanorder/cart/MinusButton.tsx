import { useNewOrderInfo } from '../../../providers/NewOrderInfoProvider'

export default function MinusButton({item, itemQuantity}: {item: string, itemQuantity: number}) {
    
    const [newOrder, setNewOrder, mutation] = useNewOrderInfo()
    
    function handleClick() {
        if (itemQuantity == 1) {
            for (const [index, currentItem] of newOrder.order_items.entries()) {
                if (currentItem.item == item) {
                    const updatedItems = [...newOrder.order_items]
                    updatedItems.splice(index, 1)
                    setNewOrder({order_items: updatedItems})
                }
            }
        } else {
           for (const [index, currentItem] of newOrder.order_items.entries()) {
                if (currentItem.item == item) {
                    const updatedItems = [...newOrder.order_items]
                    updatedItems[index].item_quantity = itemQuantity - 1
                    setNewOrder({order_items: updatedItems})
                }
           } 
           
        }
        mutation.reset()
    }

    return (
        <button onClick={handleClick}>-</button>
    )
}