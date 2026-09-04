import { NavLink } from 'react-router'

export default function Header() {

    return (
        <header className='flex flex-col'>
            <div className='p-6 flex justify-center bg-[#495E57] text-white'>
                <h1>Portfolio Project</h1>
            </div>
            <nav className='p-5 flex gap-8 bg-[#EDEFEE] border-b border-b-[#5F5F5F]'>
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