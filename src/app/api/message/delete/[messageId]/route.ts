import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { chats } from "@/model/chats";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function DELETE(req: Request, { params }: { params: { messageId: string } }) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json("Unauthorized", { status: 401 })

        const deleteMessage = await chats.deleteOne({
            _id: params.messageId
        })

        if (!deleteMessage) return NextResponse.json("Failed to delete", { status: 400 })

        return NextResponse.json({
            message: "Message deleted successfully"
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json('Invalid request', { status: 400 })
    }
}