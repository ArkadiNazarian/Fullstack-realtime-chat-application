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

        const get_sender_friends = (await users.findById(id)).friends as Array<string>
        get_sender_friends.push(session.user.id)
        await users.findByIdAndUpdate(id, {
            friends: get_sender_friends
        })

        const get_receiver_friends = (await users.findById(session.user.id)).friends as Array<string>
        get_receiver_friends.push(id)
        await users.findByIdAndUpdate(session.user.id, {
            friends: get_receiver_friends
        })

        await requests.deleteOne({
            sender_id: id,
            receiver_id: session.user.id
        })

        return NextResponse.json({
            receiver_id: session.user.id
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json('Invalid request', { status: 400 })
    }
}