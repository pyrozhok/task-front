import React from 'react'

interface CheckboxProps {
    isChecked: boolean
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export const Checkbox: React.FC<CheckboxProps> = ({ isChecked, setIsChecked }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setIsChecked(e.target.checked)
    }
    return (
        <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
                <input
                    checked={isChecked}
                    onChange={handleChange}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                />
                <span className="label-text">I agree</span>
            </label>
        </div>
    )
}
