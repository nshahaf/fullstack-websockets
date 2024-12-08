import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Role: { type: String, default: "student", enum: ["student", "mentor"], required: true },
    },
    { timestamps: true }
)


const User = mongoose.model("User", userSchema)
export default User