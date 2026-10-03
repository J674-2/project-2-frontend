export default function NotFound() {

    return (
        <>
        <title>Portfolio Project: Not Found</title>
        <div className='flex flex-col gap-6 sm:gap-8'>
            <div className='flex justify-center'>
                <h2>Not Found!</h2>
            </div>
            <div>
                <p className='text-center'>
                    The page you have navigated to does not exist on this application. 
                    Please check the URL entered for errors or use the links provided to navigate. 
                </p>
            </div>
        </div>
        </>
    )
}