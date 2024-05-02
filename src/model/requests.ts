import mongoose, { Schema } from "mongoose";

export interface IRequest extends Document {
    sender_id: string;
    receiver_id: string;
}

const requestsSchema = new Schema<IRequest>(
    {
        sender_id: String,
        receiver_id: String
    },
    {
        timestamps: true
    }
)

export const requests = mongoose.models.requests || mongoose.model("requests", requestsSchema)