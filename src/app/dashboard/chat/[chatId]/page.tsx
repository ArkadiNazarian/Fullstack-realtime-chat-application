import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ChatInput } from "@/components/ChatInput";
import { Messages } from "@/components/Messages";
import { chats } from "@/model/chats";
import { users } from "@/model/users";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface ChatRoomModel {
    params: {
        chatId: string
    }

}

const get_chat_messages = async (params: string) => {
    try {
        const get_chat = await chats.find({ chat_id: params })
        return get_chat
    } catch (error) {
        // toast.error("Try again")
    }
}

const ChatRoom = async (props: ChatRoomModel) => {

    const session = await getServerSession(authOptions);

    const string_chat_id = props.params.chatId as string;

    const ids = string_chat_id?.split('--')!

    const chat_partner_id = session?.user.id === ids[0] ? ids[1] : ids[0]

    const chat_partner = await users.findById(chat_partner_id)

    const chat_list = await get_chat_messages(props.params.chatId)

    const chatts = chat_list!.map((value) => {
        return {
            createdAt: value.createdAt,
            chat_id: value.chat_id,
            sender_id: value.sender_id,
            receiver_id: value.receiver_id,
            text: value.text
        }
    }).reverse()

    return (
        <div className='tw-flex-1 tw-justify-between tw-flex tw-flex-col tw-h-full tw-max-h-[calc(100vh-6rem)]'>
            <div className='tw-flex sm:tw-items-center tw-justify-between tw-py-3 tw-border-b-2 tw-border-gray-200'>
                <div className='tw-relative tw-flex tw-items-center tw-space-x-4'>
                    <div className="tw-relative">
                        <div className='tw-relative tw-w-8 sm:tw-w-12 tw-h-8 sm:tw-h-12'>
                            <Image
                                fill
                                referrerPolicy="no-referrer"
                                src={chat_partner.image}
                                alt={`${chat_partner.name} profile picture`}
                                className="tw-rounded-full"
                            />
                        </div>
                    </div>
                    <div className='tw-flex tw-flex-col tw-leading-tight'>
                        <div className='tw-text-xl tw-flex tw-items-center'>
                            <span className='tw-text-gray-700 tw-mr-3 tw-font-semibold'>
                                {chat_partner.name}
                            </span>
                        </div>

                        <span className='tw-text-sm tw-text-gray-600'>{chat_partner.email}</span>
                    </div>
                </div>
            </div>

            <Messages
                session_image={session?.user.image}
                chat_parter_image={chat_partner.image}
                session_id={session!.user.id}
                initial_messages={chatts!}
                chat_id={string_chat_id}
            />
            <ChatInput name={chat_partner.name} chat_id={string_chat_id} />
        </div>
    )
}

export default ChatRoom