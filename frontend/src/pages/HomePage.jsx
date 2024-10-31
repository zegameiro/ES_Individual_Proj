import { useDisclosure, Button, Tab, Tabs } from "@nextui-org/react"

import { FaUser } from "react-icons/fa";
import { PiGraph } from "react-icons/pi";

import AddTaskModal from "../components/AddTaskModal"

const HomePage = () => {

	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div className="flex flex-col">
			<h1 className="flex flex-row gap-2 items-center text-2xl font-bold"><PiGraph /> My Tasks</h1>
			<div className="flex flex-col py-5">
				<span>
					<Button onPress={onOpen}>Add a new Task</Button>
				</span>
				<AddTaskModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
			</div>
		</div>
	)
}

export default HomePage