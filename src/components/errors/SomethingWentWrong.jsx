import { Link } from 'react-router-dom'
import Error from './Error404.jsx'

function SomethingWentWrong() {
    return (
        <>
        <Error />

        {/* <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 transition duration-300'>Oops! Something went wrong</h1>
            <p className='text-xl mt-2 text-gray-800 dark:text-gray-200 transition duration-300'>
                Return to <Link to='/' className='text-blue-500 dark:text-blue-400'>Home Page</Link>
            </p>
        </div> */}

        </>

    )
}

export default SomethingWentWrong
