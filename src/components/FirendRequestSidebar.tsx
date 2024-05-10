"use client"

import { User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { io } from "socket.io-client";

interface IFriendRequestSidebarModel {
    initial_unseen_request_count: number;
    session_id: string;
}

const socket = io("http://localhost:3001");

export const FriendRequestSidebar = (props: IFriendRequestSidebarModel) => {

    const [unseen_request_count, set_unseen_request_count] = useState<number>(props.initial_unseen_request_count);

    useEffect(() => {
        const handleReceiveReq = (data: any) => {
            set_unseen_request_count((prev) => prev + 1);
        };

        socket.on(`receive_req:${props.session_id}`, handleReceiveReq);


        return () => { socket.off(`receive_req:${props.session_id}`, handleReceiveReq) };
    }, []);

    useEffect(() => {

        const handleReceiveNum = (data: any) => {
            set_unseen_request_count((prev) => prev - 1);
        };

        socket.on(`receive_update_friend_riquest_number:${props.session_id}`, handleReceiveNum);


        return () => { socket.off(`receive_update_friend_riquest_number:${props.session_id}`, handleReceiveNum) };
    }, [])

    return (
        <Link href="/dashboard/requests" className="tw-text-gray-700 hover:tw-text-indigo-600 hover:tw-bg-gray-50 tw-group tw-flex tw-items-center tw-gap-x-3 tw-rounded-md tw-text-sm tw-py-2 tw-leading-6 tw-font-semibold">
            <div className="tw-text-gray-400 tw-border-gray-200 group-hover:tw-border-indigo-600 group-hover:tw-text-indigo-600 tw-flex tw-h-6 tw-w-6 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-lg tw-border tw-text-[0.625rem] tw-font-medium tw-bg-white">
                <User className='tw-h-4 tw-w-4' />
            </div>
            <p className="tw-truncate">Friend request</p>
            {
                unseen_request_count > 0 &&
                <div className="tw-rounded-full tw-w-5 tw-h-5 tw-text-xs tw-flex tw-justify-center tw-items-center tw-text-white tw-bg-indigo-600">
                    {unseen_request_count}
                </div>

            }
        </Link>
    )
}