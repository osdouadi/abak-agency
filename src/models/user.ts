import mongoose, {Document, Schema} from "mongoose"

export interface UserInterface extands Document {

}

const userSchema: Schema = new mongoose.Schema({
   name: {
    type: String,
    required: [true]
   },
   email: {
    type: String,
    required: [true],
    unique: [true]
   },
   role: {
    type: String,
    enum: ["admin", "manager", "user"],
    default: "user"
   } 
}, {timestamps: true})

const User = mongoose.model<UserInterface>("User", userSchema)

export default User