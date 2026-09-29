import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
    return (
        <div className='h-screen flex flex-col'>
            <Header />
            <main className='flex-1 px-5 3xs:px-8 2xs:px-12 xs:px-16 md:px-8 py-10 sm:py-12 flex flex-col gap-10 sm:gap-12'>
                <div>
                    <p className='text-center'>
                        In this application, you will be able to make new orders or look through orders that have previously been made on this application. 
                        This is a portfolio web application, so no actual food orders will be made.
                    </p>
                </div>
                <div className='px-5 3xs:px-8 2xs:px-12 xs:px-16 md:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8 bg-mygrey rounded-sm'>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}