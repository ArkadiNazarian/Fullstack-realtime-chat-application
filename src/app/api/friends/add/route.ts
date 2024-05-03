import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import { NextResponse } from "next/server"
import { users } from "@/model/users"
import { requests } from "@/model/requests"


export async function POST(req: Request) {
    try {

        const { email } = await req.json()
        const person_to_add = await users.findOne({ email })

        if (!person_to_add) {
            return NextResponse.json('This person does not exist.', { status: 400 })
        }

        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json('Unauthorized', { status: 401 })
        }

        if (person_to_add._id.toString() === session.user.id) {
            return NextResponse.json('You cannot add yourself as a friend.', { status: 400 })
        }

        const is_friend = (await users.findById(session.user.id)).friends.find((value: any) => value == person_to_add._id.toString())

        if (is_friend) {
            return NextResponse.json('Already added this user', { status: 400 })
        }

        await requests.create({
            sender_id: session.user.id,
            receiver_id: person_to_add._id.toString()
        })


        return NextResponse.json('OK')
    } catch (error) {
        return NextResponse.json('Invalid request', { status: 400 })
    }
}