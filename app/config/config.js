// Database Configuration
export const DATABASE_URI = "mongodb+srv://touhid:touhid1234@cluster0.advoc.mongodb.net/userDB"

// Authentication
export const JWT_SECRET_KEY = "thisistouhiduzzamanpavel"
export const JWT_EXPIRATION_TIME = "1h"

// Payload Limits
export const MAX_JSON_PAYLOAD_SIZE = "50mb"
export const ALLOW_URL_ENCODED = true

// Request Limits
export const REQUEST_LIMIT_TIME = "15m"
export const MAX_REQUEST_LIMIT_NUMBER = 300

// Caching
export const ENABLE_CACHING = true

// Server Port
export const SERVER_PORT = 3000 || 4000