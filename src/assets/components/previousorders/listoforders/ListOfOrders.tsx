import OrdersPagination from './OrdersPagination'
import PreviousOrder from './PreviousOrder'

export default function ListOfOrders() {

    return (
        <section>
            <div className='mb-6 flex justify-center'>
                <h3>List of Orders</h3>
            </div>
            <OrdersPagination />
            <div className='flex-1 px-8 flex flex-col'>
                <PreviousOrder index={0} />
                <PreviousOrder index={1} />
                <PreviousOrder index={2} />
            </div>
        </section>
    )
}