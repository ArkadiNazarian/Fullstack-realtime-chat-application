'use client'

import { FriendRequests } from "@/components/FriendRequests"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const Requests = () => {

    const session = useSession();
    const [incoming_friend_request, set_incoming_friend_request] = useState<Array<IncomingFriendRequestModel>>();

    useEffect(() => {
        if (!session.data?.user.id) return
        axios.get('/api/requests/get', {
            params: {
                receiver_id: session.data?.user.id
            }
        }).then((result) => {
            
            set_incoming_friend_request(result.data.result)
        })
    }, [session.data?.user.id])



    return (
        <main className="tw-pt-8">
            <h1 className="tw-font-bold tw-text-5xl tw-mb-8">Add a friend</h1>
            <div className="tw-flex tw-flex-col tw-gap-4">
                <FriendRequests incoming_friend_request={incoming_friend_request!} session_id={session.data?.user.id} />
            </div>
        </main>
    )
}

export default Requests