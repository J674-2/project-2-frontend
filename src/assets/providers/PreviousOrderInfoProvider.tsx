import {useContext, createContext, useState} from 'react'

type PreviousOrderInfoContextType = null | [0|1|2, React.Dispatch<React.SetStateAction<0 | 1 | 2>>, boolean, React.Dispatch<React.SetStateAction<boolean>>]

const PreviousOrderInfoContext = createContext<PreviousOrderInfoContextType>(null)

export default function PreviousOrderInfoProvider({ children }: {children: React.ReactElement}) {

    const [orderIndex, setOrderIndex] = useState<0 | 1 | 2>(0)
    const [stopPreviousOrderFormatting, setStopPreviousOrderFormatting] = useState<boolean>(false)

    return (
        <PreviousOrderInfoContext value={[orderIndex, setOrderIndex, stopPreviousOrderFormatting, setStopPreviousOrderFormatting]}>
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