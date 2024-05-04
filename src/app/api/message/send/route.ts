import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { users } from "@/model/users";
import { chats } from "@/model/chats";

export async function POST(req: Request) {
    try {


        const body = await req.json();
        const session = await getServerSession(authOptions)

        if (!session) return NextResponse.json("Unauthorized", { status: 401 })

        const ids = body.chat_id.split("--")

        if (session.user.id !== ids[0] && session.user.id !== ids[1]) return NextResponse.json("Unauthorized", { status: 401 })

        const friend_id = session.user.id === ids[0] ? ids[1] : ids[0]

        const is_friend = await users.findById(friend_id)

        if (!is_friend) return NextResponse.json("Unauthorized", { status: 401 })

        await chats.create({
            chat_id: body.chat_id,
            sender_id: session.user.id,
            receiver_id: friend_id,
            text: body.text
        })

        return NextResponse.json("ok")
    } catch (error) {
        return NextResponse.json('Invalid request', { status: 400 })
    }
}