import { NavLink } from 'react-router'

export default function Header() {

    return (
        <header className='flex flex-col'>
            <div className='py-6 sm:py-8 flex justify-center bg-mygreen text-white'>
                <h1>Portfolio Project</h1>
            </div>
            <nav className='py-5 sm:py-7 flex gap-8 sm:gap-10 bg-mygrey border-b border-b-[#5F5F5F]'>
                <div className='flex-1 flex justify-end'>
                    <NavLink data-testid='header-previous-orders' to='/' className={({ isActive }) => isActive ? 'underline' : ''}>Previous Orders</NavLink>
                </div>
                <div className='flex-1 flex justify-start'>
                    <NavLink data-testid='header-make-an-order' to='/make-an-order' className={({ isActive }) => isActive ? 'underline' : ''}>Make an Order</NavLink>
                </div>
            </nav>
        </header>
    )
}