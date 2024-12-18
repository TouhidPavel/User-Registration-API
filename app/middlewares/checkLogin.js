import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/config.js"
export const checkLogin = (req, res, next) => {
    const { cookie } = req.headers
    try {
        const token = cookie.split("=")[1]
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
        const {id, name} = decoded
        req.id = id
        req.name = name
        next()
    } catch (err) {
        res.status(401).json({ error: "Authentication Failure!" })
    }
}