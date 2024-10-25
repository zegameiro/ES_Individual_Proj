import { useState } from "react"
import { Divider, Link, Spinner } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

import { LogoVertical } from "../assets"
import { postLogin } from "../api/postActions"
import { useUserStore } from "../stores/userStore"


const LoginPage = () => {

	const navigate = useNavigate()
	const [googleError, setGoogleError] = useState()
	const [_cookies, setCookie] = useCookies(['access_token'])
	const loginStore = useUserStore((state) => state.login) || false;

	const loginMutation = useMutation({
		mutationKey: ['login'],
		mutationFn: (data) => postLogin(data),
		onSuccess: (response) => {
			if (response.data.access_token) {
				loginStore(
					response.data.first_name,
					response.data.last_name,
					response.data.picture_url,
					response.data.access_token,
					setCookie
				)
				setTimeout(() => navigate("/home"), 1000)
			}
		},
		onError: (error) => {
			console.error("Error response from API:", error)
		}
	})

	const responseMessage = (response) => {
		loginMutation.mutate(JSON.stringify({ credential: response.credential }))
	}

	const errorMessage = (error) => {
		console.error("Error response from Google:", error)
		setGoogleError(error.message)
	}

	return (
		<main className="flex flex-col bg-gradient-to-tr from-primary to-background">
			<div className="flex flex-col px-[10%] py-[5%] justify-center min-h-screen">
				<div className="flex flex-col lg:flex-row border-2 p-4 rounded-xl shadow-lg justify-evenly bg-background">

					<div className="flex flex-row justify-center items-center space-x-10">
						<Link href="/" className="cursor-pointer">
							<img src={LogoVertical} alt="TaskFlow Logo" />
						</Link>
						<p className="text-nowrap text-2xl font-semibold">Structure your <span className="text-primary">Tasks</span>,<br /> Master your <span className="text-[#7d47a4]">Workflow</span></p>
					</div>

					<Divider orientation="vertical" className="hidden lg:flex my-4 h-[10vw]" />
					<Divider orientation="horizontal" className="flex lg:hidden my-4 w-full" />

					<div className="flex flex-col justify-center items-center space-y-2">
						<span className="text-center">
							<h1 className="text-2xl font-bold">Login with</h1>
						</span>
						{googleError || (loginMutation.isError && loginMutation?.error) ? ( // Error message either from Google OAuth2 or from the API
							<span className="flex flex-row gap-1 items-center text-error font-semibold">
								<MdError className="text-lg" /> Error -
								<p>{googleError || loginMutation.error?.response?.data?.detail?.message}</p>
							</span>

						) : loginMutation.isSuccess ? ( // Success message 
							<span className="flex flex-row gap-1 items-center text-success font-semibold">
								<FaCircleCheck /> Logged in with success
							</span>

						) : loginMutation.isPending ? ( // Loading message while waiting for API response
							<span className="flex flex-row gap-2 items-center text-primary font-semibold">
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