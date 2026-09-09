import OrdersPagination from './OrdersPagination'
import PreviousOrder from './PreviousOrder'

export default function ListOfOrders() {

    return (
        <section>
            <div>
                <h3>List of Orders</h3>
            </div>
            <OrdersPagination />
            <div>
                <PreviousOrder index={0} />
                <PreviousOrder index={1} />
                <PreviousOrder index={2} />
            </div>
        </section>
    )
}