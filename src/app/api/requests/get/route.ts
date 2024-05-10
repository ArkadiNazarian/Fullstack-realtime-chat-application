import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"
import { users } from "@/model/users"
import { requests } from "@/model/requests"

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const receiver_id = searchParams.get('receiver_id');

        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        const incoming_sender_ids = await requests.find({ receiver_id:receiver_id })

        if (!incoming_sender_ids) {
            return NextResponse.json('Not found', { status: 404 })
        }

        const incoming_friend_request = await Promise.all(
            incoming_sender_ids.map(async (value) => {
                const sender = await users.findOne({ _id: value.sender_id })
                return {
                    sender_id: value.sender_id,
                    sender_email: sender.email
                }
            })
        )

        if (!incoming_friend_request) {
            return NextResponse.json('Not found', { status: 404 })
        }

        return NextResponse.json({
            result:incoming_friend_request
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json('Invalid request', { status: 400 })
    }
}