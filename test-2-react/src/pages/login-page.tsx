import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { Form } from '../components/email-form'
import { Checkbox } from '../components/checkbox'
import { isValidEmail } from '../utils/email-validation'

export const LoginPage = () => {
    const getEmailFromSessionStorage = (): string => {
        const savedEmail = sessionStorage.getItem('userEmail')
        if (savedEmail && isValidEmail(savedEmail)) {
            return savedEmail
        }
        return ''
    }

    const [userEmail, setUserEmail] = useState(getEmailFromSessionStorage())
    const [isChecked, setIsChecked] = useState(false)
    const [isHolding, setIsHolding] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isButtonDisabled = !isValidEmail(userEmail) || !isChecked

    const navigate = useNavigate()

    const handleMouseDown = () => {
        setIsHolding(true)

        if (timeoutRef.current) {
            clearInterval(timeoutRef.current)
            timeoutRef.current = null
        }

        intervalRef.current = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 100)
        }, 100)
    }

    const handleMouseUp = () => {
        setIsHolding(false)

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        if (elapsedTime < 500) {
            timeoutRef.current = setInterval(() => {
                setElapsedTime((prevTime) => Math.max(prevTime - 100, 0))
            }, 100)
        }
    }

    useEffect(() => {
        if (isValidEmail(userEmail)) {
            sessionStorage.setItem('userEmail', userEmail)
        }
    }, [userEmail])

    useEffect(() => {
        if (elapsedTime >= 500) {
            navigate('/login/step-2')
        }
    }, [elapsedTime])

    return (
        <>
            <Form userEmail={userEmail} setUserEmail={setUserEmail} />
            <div className="p-1"></div>
            <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                disabled={isButtonDisabled}
                className="btn btn-primary mt-auto"
            >
                {isHolding || elapsedTime > 0 ? `Holding (${elapsedTime} ms)` : 'Hold to proceed'}
            </button>
        </>
    )
}
