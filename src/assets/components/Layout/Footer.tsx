import { NavLink } from 'react-router'

export default function Footer() {

    return (
        <footer>
            <div>
                <p>Portfolio Project 2026</p>
            </div>
            <ul>
                <div>
                    <NavLink data-testid='footer-previous-orders' to='/' className={({ isActive }) => isActive ? 'underline' : ''}>Previous Orders</NavLink>
                </div>
                <div>
                    <NavLink data-testid='footer-make-an-order' to='/make-an-order' className={({ isActive }) => isActive ? 'underline' : ''}>Make an Order</NavLink>
                </div>
            </ul>
        </footer>
    )
}