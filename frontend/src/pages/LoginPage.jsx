import { useState } from "react"
import { Divider, Link, Spinner } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

import { LogoVertical } from "../assets"
import axios from "../api"
import { postLogin } from "../api/postActions"

const LoginPage = () => {

    const navigate = useNavigate()
    const [googleError, setGoogleError] = useState()

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (data) => postLogin(axios, data),
        onSuccess: (response) => {
            console.log("Login successful:", response)
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token)
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            } else {
                console.log("Failed to find the access token\n", response)
            }
            console.log("Heloooooo")
        }
    })

    const responseMessage = (response) => {
        console.log("Response received from Google:", response)
        console.log("Decoded JWT:", jwtDecode(response.credential))
        const credentials = jwtDecode(response.credential)

        const data = {
            "email": credentials.email,
            "first_name": credentials.given_name,
            "last_name": credentials.family_name,
            "picture_url": credentials.picture
        }

        loginMutation.mutate(JSON.stringify(data))
    }

    const errorMessage = (error) => {
        console.error("Error response from Google:", error)
        setGoogleError(error.message)
    }

    return (
        <main className="flex flex-col bg-gradient-to-tr from-[#7d47a4] to-white">
            <div className="flex flex-col px-[10%] py-[5%] justify-center min-h-screen">
                <div className="flex flex-row border-2 p-4 rounded-xl shadow-lg justify-evenly bg-white ">

                    <div className="flex flex-row justify-center items-center space-x-10">
                        <Link href="/" className="cursor-pointer">
                            <img src={LogoVertical} alt="TaskFlow Logo" width="170vw" />
                        </Link>
                        <p className="text-nowrap text-2xl font-semibold">Structure your <span className="text-[#7d47a4]">Tasks</span>,<br /> Master your <span className="text-[#7d47a4]">Workflow</span></p>
                    </div>

                    <Divider orientation="vertical" className="my-4 h-[10vw]" />

                    <div className="flex flex-col justify-center items-center space-y-2">
                        <span className="text-center">
                            <h1 className="text-2xl font-bold">Login with</h1>
                        </span>
                        {googleError || (loginMutation.isError && loginMutation?.error) ? ( // Error message either from Google OAuth2 or from the API
                            <span className="flex flex-row gap-1 items-center text-red-600 font-semibold">
                                <MdError className="text-lg" /> Error - 
                                <p>{googleError || loginMutation.error?.response?.data?.detail?.message}</p>
                            </span>

                        ) : loginMutation.isSuccess ? ( // Success message 
                            <span className="flex flex-row gap-1 items-center text-green-500 font-semibold">
                                <FaCircleCheck /> Logged in with success
                            </span>

                        ) : loginMutation.isPending ? ( // Loading message while waiting for API response
                            <span className="flex flex-row gap-2 items-center text-[#7d47a4] font-semibold">
                                <Spinner size="md" color="secondary" /> Loading
                            </span>

                        ) : ( // Google Login element (default case)
                            <GoogleLogin
                                onSuccess={responseMessage}
                                onError={errorMessage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LoginPage