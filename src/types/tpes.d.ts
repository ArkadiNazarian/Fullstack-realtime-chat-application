interface IncomingFriendRequestModel {
    sender_id: string;
    sender_email?: string;
}

interface Message {
    chat_id: string;
    sender_id: string;
    receiver_id: string;
    text: string;
    createdAt: Date
}