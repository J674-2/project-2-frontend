import { NavLink } from 'react-router'

export default function Footer() {

    return (
        <footer className='py-6 flex flex-col gap-5 bg-[#495E57]'>
            <div className='flex justify-center '>
                <p className='font-markazi text-[18px]  text-white'>Portfolio Project 2026</p>
            </div>
            <ul className='flex gap-8'>
                <div className='flex-1 flex justify-end'>
                    <NavLink data-testid='footer-previous-orders' to='/' className={({ isActive }) => isActive ? 'text-[18px] text-white underline' : 'text-[18px] text-white'}>Previous Orders</NavLink>
                </div>
                <div className='flex-1 flex justify-start'>
                    <NavLink data-testid='footer-make-an-order' to='/make-an-order' className={({ isActive }) => isActive ? 'text-[18px] text-white underline' : 'text-[18px] text-white'}>Make an Order</NavLink>
                </div>
            </ul>
        </footer>
    )
}