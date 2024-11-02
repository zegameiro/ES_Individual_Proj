import { useDisclosure, Button, Spinner } from "@nextui-org/react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { PiGraph } from "react-icons/pi";

import AddTaskModal from "../components/AddTaskModal"
import { getTasks } from "../api/taskActions";
import TaskCard from "../components/TaskCard";

const HomePage = () => {

	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const [currentTask, setCurrentTask] = useState()
	const [isEdit, setIsEdit] = useState(false)

	const { data: tasks, isLoading: loadingTasks } = useQuery({
		queryKey: ["getTasks"],
		queryFn: () => getTasks()
	})

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center justify-evenly">
				<h1 className="flex flex-row gap-2 items-center text-2xl font-bold"><PiGraph /> My Tasks</h1>
				<Button onPress={onOpen} onClick={() => { setIsEdit(false); setCurrentTask() }}>Add a new Task</Button>
			</div>
			<div className="flex flex-col py-5">
				<AddTaskModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} currentTask={currentTask} isEdit={isEdit} />
				<div className="flex flex-col space-y-4">

					{tasks && tasks?.data?.length > 0 ? ( // Show the list of tasks organized by cards
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{tasks.data.map((task, index) => (
								<TaskCard key={index} task={task} onOpen={onOpen} setCurrentTask={setCurrentTask} setIsEdit={setIsEdit} />
							))}
						</div>

					) : loadingTasks ? ( // The query is still being done
						<span className="flex flex-row gap-2 justify-center w-full items-center text-primary font-semibold">
							<Spinner size="md" color="secondary" /> Loading
						</span>

					) : ( // Default case no tasks were found
						<span>No Tasks where found</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default HomePage