import type { ICreateUserRequest } from "../types"

interface IFormProps {
    formData: ICreateUserRequest
}

export const Form = ({ formData }: IFormProps) => {
    return (
        <form className="user-form">
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