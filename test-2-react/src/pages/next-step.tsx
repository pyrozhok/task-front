import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popup } from '../components/popup'

export const NextStep = () => {
    const [requestStatus, setRequestStatus] = useState<'success' | 'error' | null>(null)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoadig] = useState(false)

    const navigate = useNavigate()
    const email = sessionStorage.getItem('userEmail')

    const handleConfirm = async () => {
        setIsLoadig(true)
        try {
            const response = await fetch('http://localhost:4040/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setRequestStatus('success')
                setMessage('Success!')
            }
        } catch (error) {
            setRequestStatus('error')
            setMessage('Error!')
        } finally {
            setIsLoadig(false)
        }
    }

    return (
        <>
            <div>
                <span>Email</span>
                <div>
                    <p>{email ? email : 'Check if Email is valid'}</p>
                </div>
            </div>
            <div className="flex justify-between mt-auto">
                <button className="btn flex-1" onClick={() => navigate('/login/step-1')}>
                    Back
                </button>
                <button onClick={handleConfirm} className="btn btn-primary ml-2 flex-1" disabled={isLoading}>
                    Confirm
                </button>
            </div>

            {requestStatus && <Popup status={requestStatus} message={message} onClose={() => setRequestStatus(null)} />}
        </>
    )
}
