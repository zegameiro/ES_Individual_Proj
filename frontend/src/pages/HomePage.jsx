
import NavBarComp from "../components/NavBarComp"

const HomePage = () => {

    return (
        <div className="flex flex-col">
            <NavBarComp />
            <div className="px-[10vw] py-[4vh]">
                <h1 className="text-2xl font-bold pb-10">Homepage</h1>
            </div>
        </div>
    )
}

export default HomePage