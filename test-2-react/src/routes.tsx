import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login-page'
import { NextStep } from './pages/next-step'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login/step-1" element={<LoginPage />} />
            <Route path="/login/step-2" element={<NextStep />} />
        </Routes>
    )
}
