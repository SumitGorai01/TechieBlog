import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loader from './components/loaders/Loading.jsx'

// Lazy loading components
const AuthLayout = lazy(() => import('./components/index.js').then(module => ({ default: module.AuthLayout })));
const Login = lazy(() => import('./components/index.js').then(module => ({ default: module.Login })));
const Error404 = lazy(() => import('./components/errors/Error404.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const AddPost = lazy(() => import('./pages/AddPost.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const EditPost = lazy(() => import('./pages/EditPost.jsx'));
const Post = lazy(() => import('./pages/Post.jsx'));
const AllPosts = lazy(() => import('./pages/AllPosts.jsx'));
const SearchedBlogs = lazy(() => import('./pages/SearchedBlogs.jsx'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./components/ResetPassword.jsx'));
const Contributors = lazy(() => import('./pages/Contributors.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const ChangePassword = lazy(() => import('./pages/ChangePassword.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const FAQ = lazy(() => import('./components/FAQ.jsx'));
const Terms = lazy(() => import('./components/Terms.jsx'));
const FeedbackPage = lazy(() => import('./components/FeedbackPage.jsx'));
const AboutUs = lazy(() => import('./components/AboutUs.jsx'));
const ContactUs = lazy(() => import('./components/ContactUs.jsx'));
const Events = lazy(() => import('./components/Events.jsx'));
const Register = lazy(() => import('./components/Register.jsx'));
const Verify = lazy(() => import('./pages/Verify.jsx'));
const AddEvent = lazy(() => import('./components/AddEvent.jsx'))
const AddComment = lazy(() => import('./components/AddComment.jsx'));
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "/verify-email",
                element:(
                    <AuthLayout authentication={false}>
                        <Verify />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path: "/forgot-password",
                element: (
                    <AuthLayout authentication={false}>
                        <ForgotPassword />
                    </AuthLayout>
                ),
            },
            {
                path: "/reset-password",  // Updated path for Appwrite password reset
                element: (
                    <AuthLayout authentication={false}>
                        <ResetPassword />
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-comment",
                element: (
                    <AuthLayout authentication>
                        <AddComment/>
                    </AuthLayout>
                )
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        <EditPost />
                    </AuthLayout>
                ),
            }, {
                path: "/settings",
                element: (
                    <AuthLayout authentication>
                        <Settings />
                    </AuthLayout>
                )
            }, {
                path: "/change-password",
                element: (
                    <AuthLayout authentication>
                        <ChangePassword />
                    </AuthLayout>
                )
            }, {
                path: "/profile",
                element: (
                    <AuthLayout authentication>
                        <Profile />
                    </AuthLayout>
                )
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
            {
                path: "/search/:slug",
                element: <SearchedBlogs />,
            },
            {
                path: "/contributors",
                element: <Contributors />,
            },
            {
                path: "/faq",
                element: <FAQ />,
            },
            {
                path: "/feedback",
                element: <FeedbackPage />
            },
            {
                path: "/about-us",
                element: <AboutUs />
            },
            {
                path: "/events",
                element: <Events />
            },
            {
                path: "/add-event",
                element: <AddEvent />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/contact-us",
                element: <ContactUs />
            },
            {
                path: "*",
                element: <Error404 />,
            },
            {
                path: "/terms",
                element: <Terms />,
            },
        ],
    },
]);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} >
                <Suspense fallback={<Loader />}>
                    <RouterProvider router={router} />
                </Suspense>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);