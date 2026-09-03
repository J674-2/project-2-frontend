import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
    return (
        <div>
            <Header />
            <main>
                <div>
                    <p>
                        In this application, you will be able to make new orders or look through orders that have previously been made on this application. 
                        This is a portfolio web application, so no actual food orders will be made.
                    </p>
                </div>
                <div>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}