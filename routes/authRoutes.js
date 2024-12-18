import express from "express"
import {userRegister, userLogin} from "../app/controllers/authController.js"
const router = express.Router()

// User Registration API
router.post("/register", userRegister)

// User Login API
router.post("/login", userLogin)

export default router