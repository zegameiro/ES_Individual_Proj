import { useState } from "react"
import { User, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { googleLogout } from "@react-oauth/google"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { PiGraph } from "react-icons/pi";

import { useUserStore } from "../stores/userStore"
import { postLogout } from "../api/postActions"
import axios from "../api"

const ProfileComponent = () => {

    const [cookies, _setCookie, removeCookie] = useCookies(["access_token"]);
    const [access_token, setAccessToken] = useState(cookies['access_token']);

    const first_name = useUserStore((state) => state.first_name) || "Not";
    const last_name = useUserStore((state) => state.last_name) || "Known";
    const picture_url = useUserStore((state) => state.picture_url) || "";

    console.log(picture_url)

    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => postLogout(axios, access_token),
        onSuccess: () => {
          removeCookie("access_token")
          setAccessToken(null)
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
                <DropdownItem key="new" textValue="Profile">
                    <span className="flex flex-row items-center gap-2"><FaUser /> Profile</span>
                </DropdownItem>
                <DropdownItem key="copy" textValue="My Tasks">
                    <p className="flex flex-row items-center gap-2"><PiGraph className="text-lg"/> My Tasks</p>
                </DropdownItem>
                <DropdownItem key="delete" color="danger" textValue="Logout" onClick={() => logoutMutation.mutate()}>
                    <p className="flex flex-row items-center gap-2 text-danger hover:text-white"><FiLogOut /> Logout</p>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ProfileComponent