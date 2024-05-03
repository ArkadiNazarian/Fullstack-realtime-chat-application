import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { FriendRequests } from "@/components/FriendRequests"
import { requests } from "@/model/requests"
import { users } from "@/model/users"
import { getServerSession } from "next-auth"

const Requests = async () => {

    const session = await getServerSession(authOptions)

    const incoming_sender_ids = await requests.find({ receiver_id: session?.user.id })

    const incoming_friend_request = await Promise.all(
        incoming_sender_ids.map(async (value) => {
            const sender = await users.findOne({ _id: value.sender_id })
            return {
                sender_id: value.sender_id,
                sender_email: sender.email
            }
        })
    )

    return (
        <main className="tw-pt-8">
            <h1 className="tw-font-bold tw-text-5xl tw-mb-8">Add a friend</h1>
            <div className="tw-flex tw-flex-col tw-gap-4">
                <FriendRequests incoming_friend_requests={incoming_friend_request} session_id={session?.user.id}/>
            </div>
        </main>
    )
}

export default Requests