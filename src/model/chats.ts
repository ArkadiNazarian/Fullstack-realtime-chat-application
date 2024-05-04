import mongoose, { Schema } from "mongoose";

export interface Chat extends Document {
    chat_id: string;
    sender_id: string;
    receiver_id: string;
    text: string;
}

const chatSchema = new Schema<Chat>(
    {
        chat_id: String,
        sender_id: String,
        receiver_id: String,
        text: String
    },
    {
        timestamps: true
    }
)

export const chats = mongoose.models.chats || mongoose.model("chats", chatSchema)