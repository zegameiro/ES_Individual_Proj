import { useDisclosure, Button, Spinner, Select, SelectItem } from "@nextui-org/react"
import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query";
import { PiGraph } from "react-icons/pi";

import AddTaskModal from "../components/AddTaskModal"
import { getTasks } from "../api/taskActions";
import TaskCard from "../components/TaskCard";
import Legend from "../components/Legend";

const HomePage = () => {

	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const [currentTask, setCurrentTask] = useState()
	const [isEdit, setIsEdit] = useState(false)
	const [filters, setFilters] = useState("")

	const { data: tasks, isLoading: loadingTasks } = useQuery({
		queryKey: ["getTasks"],
		queryFn: () => getTasks()
	})

	const filteredTasks = useMemo(() => {
		if (!tasks || !tasks.data) return [];
		return tasks.data.filter(task => {
			if ([...filters]?.includes("completed")) return task.is_completed;
			if ([...filters]?.includes("incomplete")) return !task.is_completed;
			if ([...filters]?.includes("low")) return task.priority == "low";
			if ([...filters]?.includes("medium")) return task.priority == "medium";
            if ([...filters]?.includes("high")) return task.priority == "high";
			return true; // no filters applied
		});
	}, [filters, tasks]);

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center justify-evenly">
				<h1 className="flex flex-row gap-2 items-center text-2xl font-bold"><PiGraph /> My Tasks</h1>
				<Button onPress={onOpen} onClick={() => { setIsEdit(false); setCurrentTask() }}>Add a new Task</Button>
			</div>
			<Legend />
			<div className="flex flex-col py-5">
				<AddTaskModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} currentTask={currentTask} isEdit={isEdit} setIsEdit={setIsEdit} setCurrentTask={setCurrentTask} />
				<div className="flex flex-row justify-end">
					<Select 
						labelPlacement="outside" 
						className="pb-5 max-w-xs" 
						variant="underlined" 
						label="Filter Tasks" 
						selectedKeys={filters} 
						onSelectionChange={setFilters}
					>
						<SelectItem key="completed">Completed Tasks</SelectItem>
						<SelectItem key="incomplete">Incomplete Tasks</SelectItem>
						<SelectItem key="low">Priority Low</SelectItem>
						<SelectItem key="medium">Priority Medium</SelectItem>
						<SelectItem key="high">Priority High</SelectItem>
					</Select>
				</div>
				<div className="flex flex-col space-y-4">

					{filteredTasks && filteredTasks?.length > 0 ? ( // Show the list of tasks organized by cards
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{filteredTasks?.map((task, index) => (
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