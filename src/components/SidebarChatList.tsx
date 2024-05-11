'use client'

import { chatHrefConstructor } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface SidebarChatListModel {
    friends: Array<{
        id: string;
        email: string;
        name: string;
    }>;
    session_id: string;
}

const socket = io("http://localhost:3001");

export const SidebarChatList = (props: SidebarChatListModel) => {

    const router = useRouter()
    const pathname = usePathname()
    const session = useSession()
    const [useen_messages, set_unseen_messages] = useState([])
    const [friends,set_friends]=useState<any>([])

    useEffect(() => {
        if (pathname.includes('chat')) {
            set_unseen_messages((prev) => {
                return prev.filter((value: any) => !pathname.includes(value.sender_id))
            })
        }
    }, [pathname])

    useEffect(()=>{
        set_friends(props.friends)
    },[props.friends])

    useEffect(()=>{
        const handler = (data: any) => {
            set_friends([...friends, data])
        }

        socket.on(`receive_updated_friend_list:${props.session_id}`, handler)

        return () => { socket.off(`receive_updated_friend_list:${props.session_id}`, handler) };
    },[])

    return (
        <ul role="list" className="tw-max-h-[25rem] tw-overflow-y-auto tw--mx-2 tw-space-y-1">
            {
                friends?.map((value:any) => {
                    const unseen_messages_count = useen_messages.filter((msg: any) => {
                        return msg.sender_id === value.id
                    }).length
                    return <li key={value.id}>
                        <a className="tw-text-gray-700 hover:tw-text-indigo-600 hover:tw-bg-gray-50 tw-group tw-flex tw-items-center tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-leading-6 tw-font-bold" href={`/dashboard/chat/${chatHrefConstructor(session.data?.user.id, value.id)}`}>
                            {value.name}
                        </a>
                    </li>
                })
            }
        </ul>
    )
}