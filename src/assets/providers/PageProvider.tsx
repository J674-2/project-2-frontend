import { useContext, createContext, useState } from 'react'

const PageContext = createContext<null | [number, React.Dispatch<React.SetStateAction<number>>]>(null)

export default function PageProvider({ children }: {children: React.ReactElement}) {

    const [page, setPage] = useState(1)

    return (
        <PageContext value={[page, setPage]}>
            {children}
        </PageContext>
    )
}

export const usePage = () => {
    const contextValue = useContext(PageContext)
    if (!contextValue) {
        throw new Error('usePage must be used within a Provider')
    }
    return contextValue
}