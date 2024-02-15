import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './nav'


const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

/**
 * This is an example of using JSDOC to define types for your component
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
 *
 * @returns {React.ReactNode}
 */
function App() {
    return (
        <div className="container">
            <Nav />
            <div className="mt-5">
                <Outlet />
            </div>
        </div>
    )
}

export default App
