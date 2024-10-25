import { useDisclosure, Button, Tab, Tabs } from "@nextui-org/react"

import { FaUser } from "react-icons/fa";
import { PiGraph } from "react-icons/pi";

import AddTaskModal from "../components/AddTaskModal"

const HomePage = () => {

	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div className="flex flex-col">
			<Tabs color="primary" variant="underlined" aria-label="Profile-options" className="justify-center">
				<Tab title={
            <span className="flex flex-row items-center gap-2 text-lg">
              <FaUser /> Profile
            </span>
          }
				>

				</Tab>

				<Tab title={
            <span className="flex flex-row items-center gap-2 text-lg">
              <PiGraph /> My Tasks
            </span>
          }
				>
					<Button onPress={onOpen}>Add a new Task</Button>
					<AddTaskModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
				</Tab>
			</Tabs>
		</div>
	)
}

export default HomePage