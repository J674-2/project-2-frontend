import ListOfOrders from './listoforders/ListOfOrders'
import OrderSummary from './ordersummary/OrderSummary'

export default function PreviousOrders() {
    return (
        <>
        <div className='flex justify-center'>
            <h2>Previous Orders</h2>
        </div>
        <div>
            <p className='text-center'>
                Here you will find information about previous orders that have been made on this application. 
                In the list of orders section, clicking on an order's corresponding 'See Order' button will display the details of that order in the order summary section. 
            </p>
        </div>
        <div className='flex flex-col gap-6 sm:gap-8'>
            <ListOfOrders />
            <OrderSummary />
        </div>
        </>
    )
}