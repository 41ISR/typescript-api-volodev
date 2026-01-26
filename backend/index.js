const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let users = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        createdAt: new Date("2026-01-15").toISOString(),
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        createdAt: new Date("2026-02-20").toISOString(),
    },
]

let nextId = 3

const createResponse = (success, data = null, error = null) => {
    return { success, data, error }
}

app.get("/api/users", (req, res) => {
    res.json(createResponse(true, users))
})

app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find((u) => u.id === id)

    if (!user) {
        return res
            .status(404)
            .json(createResponse(false, null, "User not found"))
    }

    res.json(createResponse(true, user))
})

app.post("/api/users", (req, res) => {
    const { name, email } = req.body

    if (!name || !email) {
        return res
            .status(400)
            .json(createResponse(false, null, "Name and email are required"))
    }

    if (!email.includes("@")) {
        return res
            .status(400)
            .json(createResponse(false, null, "Invalid email format"))
    }

    if (users.some((u) => u.email === email)) {
        return res
            .status(400)
            .json(createResponse(false, null, "Email already exists"))
    }

    const newUser = {
        id: nextId++,
        name,
        email,
        createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    res.status(201).json(createResponse(true, newUser))
})

app.put("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body

    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
        return res
            .status(404)
            .json(createResponse(false, null, "User not found"))
    }

    if (email && !email.includes("@")) {
        return res
            .status(400)
            .json(createResponse(false, null, "Invalid email format"))
    }

    if (email && users.some((u) => u.email === email && u.id !== id)) {
        return res
            .status(400)
            .json(createResponse(false, null, "Email already exists"))
    }

    const updatedUser = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
    }

    users[userIndex] = updatedUser
    res.json(createResponse(true, updatedUser))
})

app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
        return res
            .status(404)
            .json(createResponse(false, null, "User not found"))
    }

    users.splice(userIndex, 1)
    res.json(createResponse(true))
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json(createResponse(false, null, "Internal server error"))
})

app.use((req, res) => {
    res.status(404).json(createResponse(false, null, "Route not found"))
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api`)
})
