import {useContext, createContext, useState} from 'react'

type PreviousOrderInfoContextType = null | [{page: number, index: 0 | 1 | 2}, React.Dispatch<React.SetStateAction<{page: number, index: 0 | 1 | 2}>>, boolean, React.Dispatch<React.SetStateAction<boolean>>]

const PreviousOrderInfoContext = createContext<PreviousOrderInfoContextType>(null)

export default function PreviousOrderInfoProvider({ children }: {children: React.ReactElement}) {

    const [selectedOrder, setSelectedOrder] = useState<{page: number, index: 0 | 1 | 2}>({page: 1, index: 0})
    const [stopPreviousOrderFormatting, setStopPreviousOrderFormatting] = useState<boolean>(false)

    return (
        <PreviousOrderInfoContext value={[selectedOrder, setSelectedOrder, stopPreviousOrderFormatting, setStopPreviousOrderFormatting]}>
            {children}
        </PreviousOrderInfoContext>
    )
}

export const usePreviousOrderInfo = () => {
    const contextValue = useContext(PreviousOrderInfoContext)
    if (!contextValue) {
        throw new Error('usePreviousOrderInfo must be used within a Provider')
    } 
    return contextValue
} 