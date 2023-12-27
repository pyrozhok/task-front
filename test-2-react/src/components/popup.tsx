import React, { useEffect } from 'react'

interface PopupProps {
    status: 'success' | 'error' | null
    message: string
    onClose: () => void
}

export const Popup: React.FC<PopupProps> = ({ status, message, onClose }) => {
    useEffect(() => {
        const handleBackButton = (event: Event) => {
            const keyboardEvent = event as KeyboardEvent
            if (keyboardEvent.key === 'Backspace') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleBackButton)

        return () => {
            window.removeEventListener('keydown', handleBackButton)
        }
    }, [onClose])

    const isSuccess = status === 'success'
    const icon = isSuccess ? '✅' : '⚠️'
    return (
        <div className="bg-primary fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  text-center z-50 rounded-lg">
            <p className="text-slate-300 font-semibold">
                {message} {icon}
            </p>
            <button className="text-slate-300 font-semibold mt-2" onClick={onClose}>
                Close
            </button>
        </div>
    )
}
