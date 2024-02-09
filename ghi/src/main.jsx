import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import CreateCheckinForm from './CreateCheckinForm'
import CheckinCalendar from './CheckinCalendar'
import DetailCheckin from './DetailCheckin'
import EditCheckinForm from './EditCheckinForm'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/login',
                element: <LoginForm />,
            },
            {
                path: '/signup',
                element: <SignupForm />,
            },
            {
                path: '/create',
                element: <CreateCheckinForm />,
            },
            {
                path: '/calendar',
                element: <CheckinCalendar />,
            },
            {
                path: "/checkins/:checkin_id",
                element: <DetailCheckin />
            },
            {
                path: "/checkins/:checkin_id/edit",
                element: <EditCheckinForm />
            }
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
