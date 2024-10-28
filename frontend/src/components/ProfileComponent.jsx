import { User, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { PiGraph } from "react-icons/pi";

import { useUserStore } from "../stores/userStore"
import { postLogout } from "../api/postActions"

const ProfileComponent = () => {

	const [_cookies, _setCookie, removeCookie] = useCookies()

	const first_name = useUserStore((state) => state.first_name) || "Not";
	const last_name = useUserStore((state) => state.last_name) || "Known";
	const picture_url = useUserStore((state) => state.picture_url) || "";
	const logoutStore = useUserStore((state) => state.logout) || false;

	const navigate = useNavigate()

	const logoutMutation = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => postLogout(access_token),
		onSuccess: () => {
			logoutStore(removeCookie)
			googleLogout()
			navigate("/")
		}
	})

	return (
		<Dropdown backdrop="blur">
			<DropdownTrigger>
				<User
					as="button"
					src={picture_url}
					name={`${first_name} ${last_name}`}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions">
				<DropdownItem textValue="Profile" onClick={() => navigate("/home")}>
					<p className="flex flex-row items-center gap-2"><FaUser /> Profile</p>
				</DropdownItem>
				<DropdownItem textValue="My Tasks" onClick={() => navigate("/home")} showDivider>
					<p className="flex flex-row items-center gap-2"><PiGraph /> My Tasks</p>
				</DropdownItem>
				<DropdownItem key="delete" color="danger" textValue="Logout" onClick={() => {logoutMutation.mutate()}}>
					<span className="flex flex-row items-center gap-2 text-danger hover:text-white"><FiLogOut /> Logout</span>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}

export default ProfileComponent