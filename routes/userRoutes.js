import express from "express"
import * as userController from "../app/controllers/userController.js"
import { checkLogin } from "../app/middlewares/checkLogin.js"
const router = express.Router()


// All Users Profile API
router.get("/", checkLogin, userController.allUser)

// Single User Profile API
router.get("/:id", checkLogin, userController.singleUser)

// Single User Profile Update API
router.put("/:id", checkLogin, userController.updateUser)

// Delete Single User API
router.delete("/:id", checkLogin, userController.deleteUser)

export default router