'use client'

import { cn } from "@/lib/utils";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client";

interface MessagesModel {
    initial_messages: Array<MessageResponse>;
    session_id: string;
    session_image: string;
    chat_parter_image: string;
    chat_id: string;
}

const socket = io("http://localhost:3001");

export const Messages = (props: MessagesModel) => {

    const scrollDownRef = useRef<HTMLDivElement | null>(null);

    const [messages, set_messages] = useState<Array<MessageResponse>>(props.initial_messages);

    const deleteMessage = (id: String) => {
        axios.delete(`/api/message/delete/${id}`).then((result) => {
            set_messages(messages.filter((value) => value._id !== id))
        }).then(() => {
            socket.emit("delete_message", { messageId: id, chat_id: props.chat_id })
        })
    }

    useEffect(() => {

        const handlerReceiveMsg = (data: any) => {
            const msg = data.result
            set_messages([msg, ...messages])
        }

        socket.on(`receive_msg:${props.chat_id}`, handlerReceiveMsg);
        return () => { socket.off(`receive_msg:${props.chat_id}`, handlerReceiveMsg) };
    }, [messages])

    useEffect(() => {
        const handlerReceiveDeleteMsg = (data: any) => {
            set_messages(messages.filter((value) => value._id !== data.messageId))
        }
        socket.on(`receive_delete_message:${props.chat_id}`, handlerReceiveDeleteMsg);
        return () => { socket.off(`receive_delete_message:${props.chat_id}`, handlerReceiveDeleteMsg) };
    }, [messages])

    const time_formater = (date: Date) => {
        return moment(date).format("HH:mm")
    }

    return (
        <div className='tw-flex tw-h-full tw-flex-1 tw-flex-col-reverse tw-gap-4 tw-p-3 tw-overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
            <div ref={scrollDownRef} />
            {
                messages.map((value, index) => {
                    const is_current_user = value.sender_id === props.session_id
                    const has_next_message_from_same_user = messages[index - 1]?.sender_id === messages[index].sender_id

                    return (
                        <div key={`${value.chat_id}-${value.createdAt}`}  className="tw-group ">
                            <div className={cn("tw-flex tw-items-end", { "tw-justify-end": is_current_user })}>
                                <div className="group-hover:tw-visible hover:tw-cursor-pointer tw-invisible tw-text-red-500 tw-rounded-md" onClick={() => deleteMessage(value._id)}>
                                    Delete
                                </div>
                                <div className={cn("tw-flex tw-flex-col tw-space-y-2 tw-text-base tw-max-w-xs tw-mx-2", { "tw-order-1 tw-items-end": is_current_user, "tw-order-2 tw-items-start": !is_current_user })}>
                                    <span
                                        className={cn('tw-px-4 tw-py-2 tw-rounded-lg tw-inline-block', {
                                            'tw-bg-indigo-600 tw-text-white': is_current_user,
                                            'tw-bg-gray-200 tw-text-gray-900': !is_current_user,
                                            'tw-rounded-br-none':
                                                !has_next_message_from_same_user && is_current_user,
                                            'tw-rounded-bl-none':
                                                !has_next_message_from_same_user && !is_current_user,
                                        })}>
                                        {value.text}{' '}
                                        <span className='tw-ml-2 tw-text-xs tw-text-gray-400'>
                                            {time_formater(value.createdAt)}
                                        </span>
                                    </span>
                                </div>

                                <div className={cn('tw-relative tw-w-6 tw-h-6', { 'tw-order-2': is_current_user, "tw-order-1": !is_current_user, "tw-invisible": has_next_message_from_same_user })}>
                                    <Image
                                        fill
                                        src={is_current_user ? props.session_image : props.chat_parter_image}
                                        alt="profile message images"
                                        referrerPolicy="no-referrer"
                                        className="tw-rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}