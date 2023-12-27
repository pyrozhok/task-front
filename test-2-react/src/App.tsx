import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import AppRoutes from './routes'

export default function App() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/login/step-1')
        }
    }, [])

    return (
        <>
            <header className="h-20 bg-primary flex items-center p-4">
                <h1 className="text-3xl text-black">Title</h1>
            </header>
            <main className="flex flex-col p-4 h-full">
                <AppRoutes />
            </main>
        </>
    )
}
