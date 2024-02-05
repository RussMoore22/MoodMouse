import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import CreateCheckinForm from './CreateCheckinForm'
import DetailCheckin from './DetailCheckin'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <LoginForm />
            },
            {
                path: "/signup",
                element: <SignupForm />
            },
            {
                path: "/create",
                element: <CreateCheckinForm />
            },
            {
                path: "/checkins/:checkin_id",
                element: <DetailCheckin />
            }
        ]
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
