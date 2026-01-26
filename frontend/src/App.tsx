import "./App.css"

export default function App() {
    return (
        <div className="app">
            <header className="header">
                <h1>TypeScript Fetch Demo</h1>
            </header>

            <main className="main">
                <section className="form-section">
                    <h2>Add New User</h2>
                    <form className="user-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="john@example.com"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Create User
                        </button>
                    </form>
                </section>

                <section className="users-section">
                    <div className="section-header">
                        <h2>Users</h2>
                        <button className="btn btn-secondary">Refresh</button>
                    </div>

                    <div className="users-list"></div>
                </section>
            </main>
        </div>
    )
}
