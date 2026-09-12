import { useNewOrderInfo } from '../../../providers/NewOrderInfoProvider'

export default function PlusButton({item, itemQuantity}: {item: string, itemQuantity: number}) {
    
    const [mutation, newOrder, setNewOrder] = useNewOrderInfo()

    function handleClick() {
        for (const [index, currentItem] of newOrder.entries()) {
            if (currentItem.item == item) {
                const updatedItems = [...newOrder]
                updatedItems[index].item_quantity = itemQuantity + 1
                setNewOrder(updatedItems)
            }
        } 
        mutation.reset()
    }

    return (
        <button onClick={handleClick}>+</button>
    )
}