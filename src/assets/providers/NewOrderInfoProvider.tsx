import { useContext, createContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { NewOrderType, PreviousOrderType } from '../../utils/types'

const NewOrderInfoContext = createContext<null | [NewOrderType, React.Dispatch<React.SetStateAction<NewOrderType>>, UseMutationResult<PreviousOrderType, Error, void, unknown>]>(null)

export default function NewOrderInfoProvider({ children }: {children: React.ReactElement}) {

    const [newOrder, setNewOrder] = useState<NewOrderType>({order_items: []})

    async function orderMutation(): Promise<PreviousOrderType> {
        const response = await fetch('https://portfolioapp1.com/api/orders', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newOrder)})
        if (!response.ok) {
            throw new Error()
        }
        return response.json()
    }

    const mutation = useMutation({
        mutationFn: orderMutation,
        onSuccess: () => {
            setNewOrder({order_items: []})
        }
    })
    
    return (
        <NewOrderInfoContext value={[newOrder, setNewOrder, mutation]}>
            {children}
        </NewOrderInfoContext>
    )
}

export const useNewOrderInfo = () => {
    const contextValue = useContext(NewOrderInfoContext)
        if (!contextValue) {
            throw new Error('useNewOrderInfo must be used within a Provider')
        }
        return contextValue
}