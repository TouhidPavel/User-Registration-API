// Import required modules
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import hpp from "hpp"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import {REQUEST_LIMIT_TIME, MAX_REQUEST_LIMIT_NUMBER, MAX_JSON_PAYLOAD_SIZE, ALLOW_URL_ENCODED, ENABLE_CACHING, SERVER_PORT} from "./app/config/config.js"
import connectDatabase from "./app/config/db.js"

const app = express()

// Security Middlewares
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(hpp())

// Rate Limiting
const limiter = rateLimit({
    windowMs: REQUEST_LIMIT_TIME,
    max: MAX_REQUEST_LIMIT_NUMBER,
    message: "Too many requests, please try again later."
})
app.use(limiter)

// Body Parsing
app.use(express.json({limit: MAX_JSON_PAYLOAD_SIZE}))
app.use(express.urlencoded({ extended: ALLOW_URL_ENCODED }))

// Connect to MongoDB
connectDatabase()

// Web Caching
app.set("eTag", ENABLE_CACHING)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send('Bad URL Request: Page Not Found')
})

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Internal Server Error" })
})

// Start Server
const PORT = SERVER_PORT
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`)
})