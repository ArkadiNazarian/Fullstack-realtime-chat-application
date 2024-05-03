import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import { NextResponse } from "next/server"
import { users } from "@/model/users"
import { requests } from "@/model/requests"

export async function POST(req: Request) {
    try {
        const { id } = await req.json()
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        const is_already_friends = (await users.findById(session.user.id)).friends.find((value: string) => value === id)

        if (is_already_friends) {
            return NextResponse.json('Already friends', { status: 400 })
        }

        const is_arleady_requested = await requests.findOne({ sender_id: id, receiver_id: session.user.id })

        if (!is_arleady_requested) {
            return NextResponse.json('No friend request', { status: 400 })
        }

        await requests.deleteOne({
            sender_id: id,
            receiver_id: session.user.id
        })

        return NextResponse.json('Ok')

    } catch (error) {
        return NextResponse.json('Invalid request', { status: 400 })
    }
}