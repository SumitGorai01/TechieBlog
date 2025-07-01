import { Suspense, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import SomethingWentWrong from './components/errors/SomethingWentWrong.jsx'
import Loading from './components/loaders/Loading.jsx'
import MobileNavbar from './components/Header/MobileNavbar.jsx'
import { ToastContainer } from 'react-toastify';
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const darkMode = useSelector((state) => state.theme.darkMode)
  const [isFading, setIsFading] = useState(false);
  const prevDarkMode = useRef(darkMode);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      }) // catch user kar sakte hai
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (prevDarkMode.current !== darkMode) {
      setIsFading(true);
      setTimeout(() => setIsFading(false), 400); // match transition duration
      prevDarkMode.current = darkMode;
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
  
    <ErrorBoundary fallback={<SomethingWentWrong />}>
      {!loading ? (
        <div className={`min-h-screen flex flex-wrap content-between bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-300 ${isFading ? 'opacity-50 transition-opacity duration-400' : 'opacity-100 transition-opacity duration-400'}`}>
          <div className='w-full flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>
               
              {/* <span className='mt-48 pt-48 text-2xl'><br />
            Welcome To TechieBlog</span>  */}
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </main>
            <Footer />
            {authStatus && <MobileNavbar />}
          </div>
           <ToastContainer position="top-right" autoClose={3000} />
        </div>
        
      ) : <Loading />}
    </ErrorBoundary>
  )
}

export default App