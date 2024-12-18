import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        trim: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    NIDNumber: {
        type: String,
        required: [true, "NID Number is Required"],
        unique: true,
        validate: {
            validator: (v) => {
                const regex = /^[0-9]{10,17}$/
                return regex.test(v)
            },
            message: (props) => `${props.value} is not a valid NID number!`
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is Required"],
        unique: true,
        validate: {
            validator: (v) => {
                const regex = /^[0-9]{11}$/
                return regex.test(v)
            },
            message: (props) => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: [8, "Password Must be at Least 8 Characters"]
    },
    bloodGroup: {
        type: String,
        required: [true, "Blood Group is Required"],
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        set: (value) => value.toUpperCase()
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema)