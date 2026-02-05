import type { ChangeEvent } from "react"
import type { ICreateUserRequest } from "../types"

interface IFormProps {
    formData: ICreateUserRequest
    handleSubmit: (e: ChangeEvent<HTMLInputElement>) => void
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Form = ({ formData, handleInputChange, handleSubmit }: IFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    value={formData.name}
                    id="name"
                    placeholder="John Doe"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    id="email"
                    placeholder="john@example.com"
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Create User
            </button>
        </form>
    )
}