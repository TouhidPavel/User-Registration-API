import bcrypt from "bcrypt"
import User from "../models/userModel.js"

// Get Single User Profile
export const singleUser = async (req, res) => {
    try {
        const singleUser = await User.findOne({ _id: req.params.id }).select({ createAt: 0, __v: 0 })
        if (!singleUser) {
            return res.status(404).json({ 
                message: "User Not Found" 
            })
        }
        res.status(200).json({
            message: "User Profile Fetched Successfully",
            user: singleUser
        })

    } catch (err) {
        res.status(500).json({
            error: "There was a Server Side Error",
            reason: err.message
        })
    }
}

// Get All User Profile
export const allUser = async (req, res) => {
    try {
        const allUser = await User.find().select({ createAt: 0, __v: 0 })
        res.status(200).json({
            message: "All User Profiles Fetched Successfully",
            users: allUser
        })

    } catch (err) {
        res.status(500).json({
            error: "There was a Server Side Error",
            reason: err.message
        })
    }
}

// Single User Profile Update
export const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = hashedPassword
        }
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            message: "User Profile Updated Successfully",
            user: updatedUser
        })

    } catch (err) {
        res.status(500).json({
            error: "There was a Server Side Error",
            reason: err.message
        })
    }
}

// Single User Profile Delete
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: req.params.id })
        if (!deletedUser) {
            return res.status(404).json({
                message: "User Not Found",
            })
        }
        res.status(200).json({
            message: "User Profile Deleted Successfully",
        })

    } catch (err) {
        res.status(500).json({
            error: "There was a Server Side Error",
            reason: err.message
        })
    }
}