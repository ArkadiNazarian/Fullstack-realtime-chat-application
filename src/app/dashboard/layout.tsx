import { Icon, Icons } from "@/components/icons"
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link"
import { ReactNode } from "react"
import { authOptions } from "../api/auth/[...nextauth]/options";
import SignOutButton from "@/components/SignoutButton";
import { FriendRequestSidebar } from "@/components/FirendRequestSidebar";
import { requests } from "@/model/requests";
import { users } from "@/model/users";
import { SidebarChatList } from "@/components/SidebarChatList";

interface Layoutprops {
    children: ReactNode
}

interface SidebarOption {
    id: number;
    name: string;
    href: string;
    Icon: Icon;
}

const sidebarOptions: Array<SidebarOption> = [
    {
        id: 1,
        name: "Add friend",
        href: "/dashboard/add",
        Icon: "UserPlus"
    }
]

const Layout = async ({ children }: Layoutprops) => {

    const session = await getServerSession(authOptions);
    const unseen_requests = await requests.find({ receiver_id: session?.user.id })
    const get_friends_list = (await users.findById(session?.user.id)).friends as Array<string>

    const friends = await Promise.all(
        get_friends_list.map(async (value) => {
            const friend = await users.findById(value)
            return {
                id:friend._id.toString(),
                name:friend.name,
                email:friend.email
            }
        })
    )

    return (
        <div className="tw-w-full tw-flex tw-h-screen">
            <div className="tw-flex tw-h-full tw-w-full tw-max-w-xs tw-flex-grow tw-flex-col tw-gap-5 tw-overflow-y-auto tw-border-r tw-border-gray-200 tw-bg-white tw-px-6">
                <Link href="/dashboard" className="tw-flex tw-h-16 tw-shrink-0 tw-items-center">
                    <Icons.Logo className="tw-h-8 tw-w-auto tw-text-indigo-600" />
                </Link>

                {
                    friends.length > 0 &&
                    <div className="tw-text-xs tw-font-semibold tw-leading-6 tw-text-gray-400">
                        Your chats
                    </div>
                }

                <nav className="tw-flex tw-flex-1 tw-flex-col">
                    <ul role="list" className="tw-flex tw-flex-1 tw-flex-col tw-gap-y-7">
                        <li><SidebarChatList friends={friends} /></li>
                        <li>
                            <div className="tw-text-xs tw-font-semibold tw-leading-6 tw-text-gray-400">
                                Overview
                            </div>
                            <ul role="list" className="tw--mx-2 tw-mt-2 tw-space-y-1">
                                {
                                    sidebarOptions.map((value) => {
                                        const Icon = Icons[value.Icon]
                                        return (
                                            <li key={value.id}>
                                                <Link href={value.href} className="tw-text-gray-700 hover:tw-text-indigo-600 hover:tw-bg-gray-50 tw-group tw-flex tw-gap-3 tw-rounded-md tw-text-sm tw-leading-6 tw-font-semibold">
                                                    <span className="tw-text-gray-400 tw-border-gray-200 group-hover:tw-border-indigo-600 group-hover:tw-text-indigo-600 tw-flex tw-h-6 tw-w-6 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-lg tw-border tw-text-[0.625rem] tw-font-medium tw-bg-white">
                                                        <Icon className="tw-h-4 tw-w-4" />
                                                    </span>
                                                    <span className="tw-truncate">
                                                        {value.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                                <li>
                                    <FriendRequestSidebar initial_unseen_request_count={unseen_requests.length} session_id={session?.user.id} />
                                </li>
                            </ul>
                        </li>

                    </ul>
                    <li className="tw--mx-6 tw-mt-auto tw-flex tw-items-center">
                        <div className="tw-flex tw-flex-1 tw-items-center tw-gap-x-4 tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-leading-6 tw-text-gray-900">
                            <div className="tw-relative tw-h-8 tw-w-8 tw-bg-gray-50">
                                <Image
                                    referrerPolicy="no-referrer"
                                    fill
                                    className="tw-rounded-full"
                                    alt="Your profile picture"
                                    src={session?.user.image || ""}
                                />
                            </div>
                            <span className="tw-sr-only">Your profile</span>
                            <div className="tw-flex tw-flex-col">
                                <span aria-hidden="true">{session?.user.name}</span>
                                <span className="tw-text-xs tw-text-zinc-400" aria-hidden="true">{session?.user.email}</span>
                            </div>
                        </div>
                        <SignOutButton />
                    </li>
                </nav>
            </div>
            {children}
        </div>
    )
}

export default Layout