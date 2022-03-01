const app = require("./app")

const dotenv = require("dotenv")
const connectDatabse = require("./config/database")

// Handling Uncaught Exception
process.on("unchaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

// Config
dotenv.config({path:"backend/config/config.env"})

// Connecting to Database
connectDatabse()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandle Promise Rejection`)

    server.close(() => {
        process.exit(1)
    })
})