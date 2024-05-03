'use client'

import { Check, UserPlus, X } from "lucide-react";
import { useState } from "react"

interface FriendRequestModel {
    incoming_friend_requests: Array<IncomingFriendRequestModel>;
    session_id: string;
}

export const FriendRequests = (props: FriendRequestModel) => {

    const [friend_request, set_firend_reuqest] = useState<Array<IncomingFriendRequestModel>>(props.incoming_friend_requests)

    return (
        <>
            {
                friend_request.length === 0 ? (
                    <p className="tw-text-sm tw-text-zinc-500">Nothing to show here ...</p>
                ) : (
                    friend_request.map((value) => (
                        <div key={value.sender_id} className="tw-flex tw-gap-4 tw-items-center">
                            <UserPlus className="tw-text-black"/>
                            <p className="tw-font-medium tw-text-lg">{value.sender_email}</p>
                            <button className="tw-w-8 tw-h-8 tw-bg-indigo-600 hover:tw-bg-indigo-700 tw-grid tw-place-items-center tw-rounded-full tw-transition hover:tw-shadow-md">
                                <Check className="tw-font-semibold tw-text-white tw-w-3/4 tw-h-3/4"/>
                            </button>
                            <button className="tw-w-8 tw-h-8 tw-bg-red-600 hover:tw-bg-red-700 tw-grid tw-place-items-center tw-rounded-full tw-transition hover:tw-shadow-md">
                                <X className="tw-font-semibold tw-text-white tw-w-3/4 tw-h-3/4"/>
                            </button>
                        </div>
                    ))
                )
            }
        </>
    )
}