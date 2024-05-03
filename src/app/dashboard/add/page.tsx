'use client'

import { AddFriendComponent } from "@/components/AddFriendComponent"
import { useSession } from "next-auth/react"

const AddFriend = () => {

    return (
        <main className="tw-pt-8">
            <h1 className="tw-font-bold tw-text-5xl tw-mb-8">Add a friend</h1>
            <AddFriendComponent/>
        </main>
    )
}

export default AddFriend