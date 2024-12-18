import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } from "../config/config.js"

// User Registration
export const userRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            NIDNumber: req.body.NIDNumber,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            bloodGroup: req.body.bloodGroup,
        })
        await newUser.save()
        res.status(201).json({
            message: "User Registration Successfully",
        })

    } catch (err) {
        res.status(500).json({
            error: "There was a Server Side Error",
            reason: err.message
        })
    }
}

// User Login
export const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ phoneNumber: req.body.phoneNumber })
        if (!user) {
            return res.status(404).json({
                error: "User Not Found",
            })
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({
                error: "Incorrect Password",
            })
        }
        // Generate JWT Token
        const token = jwt.sign({
            id: user._id,
            name: user.firstName
        }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME })
        res.cookie("authToken", token, { httpOnly: true, secure: true })

        res.status(200).json({
            message: "User Login Successfully",
            token: token,
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a Server Side Error",
            reason: err.message
        })
    }
}