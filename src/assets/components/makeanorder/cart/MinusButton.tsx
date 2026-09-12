import { useNewOrderInfo } from '../../../providers/NewOrderInfoProvider'

export default function MinusButton({item, itemQuantity}: {item: string, itemQuantity: number}) {
    
    const [mutation, newOrder, setNewOrder] = useNewOrderInfo()
    
    function handleClick() {
        if (itemQuantity == 1) {
            for (const [index, currentItem] of newOrder.entries()) {
                if (currentItem.item == item) {
                    const updatedItems = [...newOrder]
                    updatedItems.splice(index, 1)
                    setNewOrder(updatedItems)
                }
            }
        } else {
           for (const [index, currentItem] of newOrder.entries()) {
                if (currentItem.item == item) {
                    const updatedItems = [...newOrder]
                    updatedItems[index].item_quantity = itemQuantity - 1
                    setNewOrder(updatedItems)
                }
           } 
           
        }
        mutation.reset()
    }

    return (
        <button onClick={handleClick}>-</button>
    )
}