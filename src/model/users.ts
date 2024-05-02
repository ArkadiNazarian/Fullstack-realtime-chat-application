import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
    image: string;
    friends: string[];
}

const userSchema = new Schema<IUser>(
    {
        email: String,
        name: String,
        image: String,
        friends: Array<String>
    },
    {
        timestamps: true
    }
)

export const users = mongoose.models.users || mongoose.model("users", userSchema)