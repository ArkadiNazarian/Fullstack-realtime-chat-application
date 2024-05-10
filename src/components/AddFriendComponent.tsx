"use client"

import { FormikErrors, useFormik } from "formik";
import Button from "./ui/Button"
import * as yup from 'yup'
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";

interface IAddFiendModel {
    email: string;
}

const socket = io("http://localhost:3001");

export const AddFriendComponent = () => {

    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const session = useSession()

    const initial_values: IAddFiendModel = {
        email: "",
    }

    const validation_schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("This field is required")
    });

    const action_add_friend = (value: IAddFiendModel) => {
        axios.post("/api/friends/add", {
            email: value.email
        }).then((result) => {
            setShowSuccess(true)
            socket.emit("add_friend", {
                sender_id: result.data.sender_id,
                sender_email: session.data?.user.email,
                receiver_id:result.data.receiver_id
            })
        }).catch((error) => {
            toast.error(error.response.data)
        })
    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_add_friend
    })

    const form_error: FormikErrors<IAddFiendModel> = {
        email: formik.submitCount || formik.touched.email ? formik.errors.email : "",

    };

    return (
        <form className="tw-max-w-sm" onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
                Add friend by email
            </label>
            <div className="tw-mt-2 tw-flex tw-gap-4">
                <input
                    type="email"
                    className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6 tw-pl-2"
                    placeholder="you@example.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <Button type="submit">Add</Button>
            </div>
            <p className="tw-mt-1 tw-text-sm tw-text-red-600">{form_error.email}</p>
            {
                showSuccess && (
                    <p className="tw-mt-1 tw-text-sm tw-text-green-600">Friend request sent</p>
                )
            }
        </form>
    )
}