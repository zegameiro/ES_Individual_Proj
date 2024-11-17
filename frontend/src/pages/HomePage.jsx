import { useDisclosure, Button, Spinner, Select, SelectItem, Select, SelectItem } from "@nextui-org/react"
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
	const [sortOption, setSortOption] = useState("")

	const { data: tasks, isLoading: loadingTasks } = useQuery({
		queryKey: ["getTasks"],
		queryFn: () => getTasks()
	})

	const priorityOrder = { low: 1, medium: 2, high: 3 };

	const filteredSortedTasks = useMemo(() => {
		if (!tasks || !tasks.data) return [];

		// Filter tasks based on completion status
		let filteredTasks = tasks.data.filter(task => {
			if ([...filters]?.includes("completed")) return task.is_completed;
			if ([...filters]?.includes("incomplete")) return !task.is_completed;
			if ([...filters]?.includes("low")) return task.priority == "low";
			if ([...filters]?.includes("medium")) return task.priority == "medium";
			if ([...filters]?.includes("high")) return task.priority == "high";
			return true; // "all" option
		});

		// Sort tasks based on the selected sort option
		if ([...sortOption]?.includes("notCompleted")) {
			// Sort by completion status (incomplete first)
			filteredTasks = filteredTasks.sort((a, b) => a.is_completed - b.is_completed);
		} else if ([...sortOption]?.includes("titleAsc")) {
			// Sort by title in ascending order
			filteredTasks = filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
		} else if ([...sortOption]?.includes("titleDesc")) {
			// Sort by title in ascending order
			filteredTasks = filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
		} else if ([...sortOption]?.includes("priorityAsc")) {
			// Sort by priority in ascending order (low -> medium -> high)
			filteredTasks = filteredTasks.sort((a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4));
		} else if ([...sortOption]?.includes("priorityDesc")) {
			// Sort by priority in descending order (high -> medium -> low)
			filteredTasks = filteredTasks.sort((a, b) => (priorityOrder[b.priority] || 4) - (priorityOrder[a.priority] || 4));
		} else if ([...sortOption]?.includes("creationAsc")) {
            // Sort by creation date in ascending order
            filteredTasks = filteredTasks.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
        } else if ([...sortOption]?.includes("creationDesc")) {
            // Sort by creation date in descending order
            filteredTasks = filteredTasks.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
        } else if ([...sortOption]?.includes("deadlineAsc")) {
            // Sort by deadline date in ascending order
            filteredTasks = filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if ([...sortOption]?.includes("deadlineDesc")) {
            // Sort by deadline date in descending order
            filteredTasks = filteredTasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        }

		return filteredTasks;
	}, [filters, sortOption, tasks]);

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center justify-evenly">
				<h1 className="flex flex-row gap-2 items-center text-2xl font-bold"><PiGraph /> My Tasks</h1>
				<Button onPress={onOpen} onClick={() => { setIsEdit(false); setCurrentTask() }}>Add a new Task</Button>
			</div>
			<div className="flex flex-col lg:flex-row justify-between">
				<Legend />
				<div className="flex flex-col lg:flex-row lg:space-x-5">
					<Select
						labelPlacement="outside"
						className="pb-5 w-[10vw]"
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
					<Select
						labelPlacement="outside"
						className="pb-5 w-[10vw]"
						variant="underlined"
						label="Sort Tasks"
						selectedKeys={sortOption}
						onSelectionChange={setSortOption}
					>
						<SelectItem key="titleAsc">Title Asc.</SelectItem>
						<SelectItem key="titleDesc">Title Desc.</SelectItem>
						<SelectItem key="notCompleted">Not Completed</SelectItem>
						<SelectItem key="priorityAsc">Priority Asc.</SelectItem>
						<SelectItem key="priorityDesc">Priority Desc.</SelectItem>
						<SelectItem key="creationAsc">Creation Date Asc.</SelectItem>
						<SelectItem key="creationDesc">Creation Date Desc.</SelectItem>
						<SelectItem key="deadlineAsc">Deadline Asc.</SelectItem>
						<SelectItem key="deadlineDesc">Deadline Desc.</SelectItem>
					</Select>
				</div>
			</div>
			<div className="flex flex-col py-5">
				<AddTaskModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} currentTask={currentTask} isEdit={isEdit} setIsEdit={setIsEdit} setCurrentTask={setCurrentTask} />

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