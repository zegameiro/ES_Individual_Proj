import NavBarComp from "../components/NavBarComp"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

const HomePage = () => {

    const responseMessage = (response) => {
        console.log("Response received from Google:", response)
        console.log("Decoded JWT:", jwtDecode(response.credential))
    }

    const errorMessage = (error) => {
        console.error("Error response from Google:", error)
    }

    return (
        <div className="flex flex-col">
            <NavBarComp />
            <div className="px-[10vw] py-[4vh]">
                <h1 className="text-2xl font-bold pb-10">Homepage</h1>
                <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                />
            </div>
        </div>
    )
}

export default HomePage