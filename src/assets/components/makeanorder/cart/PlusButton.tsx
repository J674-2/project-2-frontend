import { useNewOrderInfo } from '../../../providers/NewOrderInfoProvider'

export default function PlusButton({item, itemQuantity}: {item: string, itemQuantity: number}) {
    
    const [newOrder, setNewOrder, mutation] = useNewOrderInfo()

    function handleClick() {
        for (const [index, currentItem] of newOrder.order_items.entries()) {
            if (currentItem.item == item) {
                const updatedItems = [...newOrder.order_items]
                updatedItems[index].item_quantity = itemQuantity + 1
                setNewOrder({order_items: updatedItems})
            }
        } 
        mutation.reset()
    }

    return (
        <button className='bg-white text-black hover:text-gray-600 text-2xl' onClick={handleClick}>+</button>
    )
}