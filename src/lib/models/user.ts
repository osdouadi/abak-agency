import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true],
      unique: [true],
    },
    email: {
      type: String,
      required: [true],
      unique: [true],
    },
    firstName: {
      type: String,
      required: [true],
    },
    lastName: {
      type: String,
      required: [true],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model<UserInterface>("User", userSchema);
