import { NavLink } from 'react-router'

export default function Header() {

    return (
        <header>
            <div>
                <h1>Portfolio Project</h1>
            </div>
            <nav>
                <div>
                    <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Previous Orders</NavLink>
                </div>
                <div>
                    <NavLink to="/make-an-order" className={({ isActive }) => isActive ? "underline" : ""}>Make an Order</NavLink>
                </div>
            </nav>
        </header>
    )
}