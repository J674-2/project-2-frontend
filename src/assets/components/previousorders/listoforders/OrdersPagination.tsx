import { useQuery } from "@tanstack/react-query"
import { ordersOptions } from "../../../../utils/queryoptions"
import { usePage } from "../../../providers/PageProvider"

export default function OrdersPagination() {

    const [page, setPage] = usePage()

    const orders = useQuery(ordersOptions(page))

    function isPreviousPageButtonDisabled() {
        if (orders.isPending) {
            return true 
        } else if (orders.isError){
            return true
        } else if (orders.data.count == 0) {
            return true
        } else if (page == 1) {
            return true
        } else {
            return false
        }
    }
    
    function pageCounter() {
        if (orders.isPending) {
            return <p>.../...</p>
        } else if (orders.isError) {
            return <p>0/0</p>
        } else {
            if (orders.isFetching) {
                return <p>.../...</p>
            }
            if (orders.data.count != 0) {
                const totalPages = Math.ceil(orders.data.count / 3)
                return <p>{`${page}/${totalPages}`}</p>
            } else {
                return <p>0/0</p>
            }
        }
    }

    function isNextPageButtonDisabled() {
        if (orders.isPending) {
            return true 
        } else if (orders.isError){
            return true
        } else if (orders.data.count == 0) {
            return true
        } else if (page == Math.ceil(orders.data.count / 3)) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className='py-6 flex gap-2.5 justify-center items-center border-t'>
            <div className='flex-1 flex justify-end'>
                <button disabled={isPreviousPageButtonDisabled()} onClick={() => setPage(page - 1)}>Previous Page</button>
            </div>
            <div>
                {pageCounter()}
            </div>
            <div className='flex-1 flex justify-start'>
                <button disabled={isNextPageButtonDisabled()} onClick={() => setPage(page + 1)}>Next Page</button>
            </div>
        </div>
    )
}