'use client'

import { useRef, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import Button from "./ui/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

interface ChatInputModel {
    name: string;
    chat_id: string;
}

const socket = io("http://localhost:3001");

export const ChatInput = (props: ChatInputModel) => {


    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [input, set_input] = useState<string>('');
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const action_send_message = () => {
        set_is_loading(true)
        axios.post('/api/message/send', {
            text: input,
            chat_id: props.chat_id
        }).then((result) => {
            const idata = result.data
            set_input('')
            textareaRef.current?.focus()
            socket.emit("send_msg", {
                result: idata
            })
        }).catch(() => {
            toast.error('Something went wrong. Please try later')
        }).finally(() => {
            set_is_loading(false)
        })

    }


    return (
        <div className='tw-border-t tw-border-gray-200 tw-px-4 tw-pt-4 tw-mb-2 sm:tw-mb-0'>
            <div className='tw-relative tw-flex-1 tw-overflow-hidden tw-rounded-lg tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 focus-within:tw-ring-2 focus-within:tw-ring-indigo-600'>
                <ReactTextareaAutosize
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            action_send_message()
                        }
                    }}
                    rows={1}
                    value={input}
                    onChange={(e) => set_input(e.target.value)}
                    placeholder={`Message ${props.name}`}
                    className="tw-block tw-outline-none tw-w-full tw-resize-none tw-border-0 tw-bg-transparent tw-text-gray-900 placeholder:tw-text-gray-400 tw-pl-2 focus:tw-ring-0 sm:tw-py-1.5 sm:tw-text-sm sm:tw-leading-6"
                />
                <div
                    onClick={() => textareaRef.current?.focus()}
                    className='tw-py-2'
                    aria-hidden='true'>
                    <div className='tw-py-px'>
                        <div className='tw-h-9' />
                    </div>
                </div>
                <div className='tw-absolute tw-right-0 tw-bottom-0 tw-flex tw-justify-between tw-py-2 tw-pl-3 tw-pr-2'>
                    <div className='tw-flex-shrin-0'>
                        <Button isLoading={is_loading} type='submit' onClick={action_send_message}>
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}